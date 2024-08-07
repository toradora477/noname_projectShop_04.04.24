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
    await downloadFileFromStorage(req, res, COLLECTIONS.PRODUCTS, fileID);
  } catch (err) {
    next(err);
  }
});

router.post('/addProduct', adminJWT, multer({ dest: path.join(__dirname, './') }).array('files', 20), async (req, res, next) => {
  try {
    const { productName, description, price, colorsInfo, category, subcategory, sizes } = req.body;
    const { _id: userID } = req.user;

    if (![userID, productName, price, sizes, colorsInfo, category, subcategory, description].every(Boolean)) {
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });
    }

    const [collection, commonParams] = [
      req.app.locals.client.db(DB).collection(COLLECTIONS.PRODUCTS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS),
    ];

    let fileIdAndColorArray;
    const parsedSizes = JSON.parse(sizes);
    const parsedColorsInfo = JSON.parse(colorsInfo);
    const colorFilesMap = new Map();

    if (Array.isArray(req.files) && req.files.length > 0) {
      req.setLoggingData({
        arrFile: req.files,
      });

      for (const file of req.files) {
        const fileId = await uploadFileToStorage(COLLECTIONS.PRODUCTS, file); // Получаем идентификатор файла

        if (!colorFilesMap.has(file.originalname)) {
          colorFilesMap.set(file.originalname, fileId);
        }
      }

      fileIdAndColorArray = parsedColorsInfo.map((colorInfo) => ({
        color: colorInfo.color,
        files: Array.from(new Set(colorInfo.images.map((imageName) => colorFilesMap.get(imageName)))),
      }));
    }

    if (!(Array.isArray(fileIdAndColorArray) && fileIdAndColorArray.length > 0)) {
      throw new ExtendedError({
        messageLog: 'Poor firebase.',
        messageJson: 'Помилка сервера. Не вдалося завантажити нові зображення.',
      });
    }

    const newBodyProduct = {
      ...(productName ? { n: productName } : {}),
      ...(price ? { p: price } : {}),
      ...(description ? { d: description } : {}),
      а: new ObjectId(userID),
      t: new Date(),
      i: await getNextSequenceValue('productNextSequenceValue', commonParams),
      f: fileIdAndColorArray,
      s: parsedSizes,
      c: [category, subcategory],
    };

    const resultInsertOne = await collection.insertOne(newBodyProduct);

    if (!resultInsertOne?.insertedId) {
      throw new ExtendedError({
        messageLog: 'Poor collection insertOne result.',
        messageJson: 'Помилка сервера. Не вдалося завантажити новий продукт.',
      });
    }

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

router.patch('/editProduct', adminJWT, async (req, res, next) => {
  try {
    const { productName, description, price, category, subcategory, sizes, _id } = req.body;

    if (![productName, price, sizes, category, subcategory, description, _id].every(Boolean)) {
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });
    }

    const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.PRODUCTS);

    const findDB = { _id: new ObjectId(_id) };

    const updateDB = {
      $set: {
        ...(productName ? { n: productName } : {}),
        ...(price ? { p: price } : {}),
        ...(description ? { d: description } : {}),
        s: sizes,
        c: [category, subcategory],
      },
    };

    const result = await collection.findOneAndUpdate(findDB, updateDB, { returnDocument: 'after' });

    if (!result) {
      throw new ExtendedError({
        messageLog: 'Failed to update document.',
        messageJson: 'Помилка сервера. Не вдалося оновити продукт.',
        code: 500,
      });
    }

    const transportationData = {
      status: true,
      data: result,
    };

    req.setLoggingData({
      log: 'Edit product',
      operation: 'updateOne for collection PRODUCTS',
      'req.body': req.body,
      result: result,
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
