const router = require('express').Router();
const multer = require('multer');
const { getNextSequenceValue, ExtendedError } = require('../../tools');
const { ObjectId } = require('mongodb');
const { adminJWT, guestJWT } = require('../../middlewares/jwtAudit');
const path = require('path');
const { DB, COLLECTIONS } = require('../../common_constants/db');

const { uploadFileToStorage, downloadFileFromStorage, deleteFileFromStorage } = require('../../services/fileUtils');

router.get('/getListAllProducts', guestJWT, async (req, res, next) => {
  try {
    const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.PRODUCTS);
    const resultFind = await collection.find({}).toArray();

    if (!resultFind?.length || !Array.isArray(resultFind))
      throw new ExtendedError({
        messageLog: 'Poor collection find result.',
        messageJson: 'Помилка сервера. Не вдалося вивантажити список продуктів.',
      });

    const transportationData = {
      status: true,
      data: resultFind,
    };

    req.setLoggingData({
      log: 'Get all list products',
      operation: 'find for collection PRODUCTS',
      dataLength: resultFind?.length ?? null,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

router.get('/getFilePreview', guestJWT, async (req, res, next) => {
  try {
    const { fileID } = req.query;
    await downloadFileFromStorage(res, COLLECTIONS.PRODUCTS, fileID);
  } catch (err) {
    next(err);
  }
});

router.post('/addProduct', adminJWT, multer({ dest: path.join(__dirname, './') }).array('files', 20), async (req, res, next) => {
  try {
    const { productName, description, price, colors } = req.body;
    const { _id: userID } = req.user;

    if (![userID, productName, price].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const [collection, commonParams] = [
      req.app.locals.client.db(DB).collection(COLLECTIONS.PRODUCTS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS),
    ];

    const fileIdArray = [];

    if (Array.isArray(req.files) && req.files?.length > 0) {
      req.setLoggingData({
        arrFile: req.files,
      });

      for (const file of req.files) {
        const fileId = await uploadFileToStorage(COLLECTIONS.PRODUCTS, file); // Получаем идентификатор файла
        fileIdArray.push(fileId); // Добавляем идентификатор файла в массив
      }
    }

    const newBodyProduct = {
      ...(productName ? { n: productName } : {}),
      ...(price ? { p: price } : {}),
      ...(description ? { d: description } : {}),
      а: new ObjectId(userID),
      t: new Date(),
      i: await getNextSequenceValue('productNextSequenceValue', commonParams),
      ...(Array.isArray(fileIdArray) && fileIdArray.length > 0 ? { f: fileIdArray } : {}),
    };

    const resultInsertOne = await collection.insertOne(newBodyProduct);

    if (!resultInsertOne?.insertedId)
      throw new ExtendedError({
        messageLog: 'Poor collection insertOne result.',
        messageJson: 'Помилка сервера. Не вдалося завантажити новий продукт.',
      });

    const transportationData = {
      status: true,
      data: { ...newBodyProduct, _id: resultInsertOne.insertedId },
    };

    req.setLoggingData({
      log: 'Add new products',
      operation: 'insertOne for collection PRODUCTS',
      'req.body': req.body,
      result: transportationData.data,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', adminJWT, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.PRODUCTS);

    const findDB = { _id: new ObjectId(id) };

    const result = await collection.findOneAndDelete(findDB);

    if (Array.isArray(result?.f) && result?.f?.length > 0)
      for (const fileID of result?.f) {
        await deleteFileFromStorage(COLLECTIONS.PRODUCTS, fileID);
      }

    if (!result)
      throw new ExtendedError({
        messageLog: 'Poor collection findOneAndDelete result.',
        messageJson: 'Помилка сервера. Не вдалося видалити продукт.',
      });

    const transportationData = {
      status: true,
      data: id,
    };

    req.setLoggingData({
      log: 'Deleted products',
      operation: 'findOneAndDelete for collection PRODUCTS',
      'req.body': req.body,
      result: transportationData.data,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
