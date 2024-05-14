const router = require('express').Router();
const multer = require('multer');
const { getNextSequenceValue, ExtendedError } = require('../../tools');
const { ObjectId } = require('mongodb');
const { adminJWT, guestJWT } = require('../../middlewares/jwtAudit');
const path = require('path');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const fs = require('fs');

const { uploadFileToStorage, downloadFileFromStorage } = require('../../services/fileUtils');

router.get('/getListAllProducts', guestJWT, async (req, res, next) => {
  try {
    // Указываем путь к файлу в Firebase Storage
    // const filePath = 'products/Screenshot_20.png'; // Пример пути к файлу

    // // Создаем временный файл для сохранения загруженного файла
    // const tempFilePath = './temp'; // Пример временного пути к файлу
    // const currentDir = process.cwd();
    // const tempFilePath2 = path.join(currentDir);

    // // Загружаем файл из Firebase Storage с помощью функции
    // await downloadFileFromStorage(filePath, tempFilePath2);

    // // Путь к текущей рабочей директории

    // // Путь к временному файлу, используя текущую рабочую директорию

    // console.log(currentDir);
    // console.log(tempFilePath2);

    // В основном файле, где вы вызываете функцию downloadFileFromStorage
    const currentDir = process.cwd();
    const filePath = 'products/Screenshot_20.png'; // Пример пути к файлу
    const tempFileName = 'temp.png'; // Пример имени временного файла
    const tempFilePath = path.join(currentDir, tempFileName);

    await downloadFileFromStorage(COLLECTIONS.PRODUCTS, filePath, tempFilePath, currentDir);

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

    req.loggingData = {
      log: 'Get all list products',
      operation: 'find for collection PRODUCTS',
      dataLength: resultFind?.length ?? null,
    };
    res.status(200).json(transportationData);
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

    const newBodyProduct = {
      ...(productName ? { n: productName } : {}),
      ...(price ? { p: price } : {}),
      ...(description ? { d: description } : {}),
      а: new ObjectId(userID),
      t: new Date(),
      i: await getNextSequenceValue('productNextSequenceValue', commonParams),
    };

    const resultInsertOne = await collection.insertOne(newBodyProduct);

    if (!resultInsertOne?.insertedId)
      throw new ExtendedError({
        messageLog: 'Poor collection insertOne result.',
        messageJson: 'Помилка сервера. Не вдалося завантажити новий продукт.',
      });

    if (req.files) {
      console.log(req.files);
      req.loggingData = {
        arrFile: req.files,
      };

      // for (const file of req.files) {
      //   const filePath = `${COLLECTIONS.PRODUCTS}/${file.originalname}`;
      //   const fileContent = fs.readFileSync(file.path);
      //   await uploadFileToStorage(filePath, fileContent);
      //   fs.unlinkSync(file.path);
      // }

      for (const file of req.files) {
        // const filePath = `${COLLECTIONS.PRODUCTS}/${file.originalname}`;
        // const fileContent = fs.readFileSync(file.path);
        await uploadFileToStorage(COLLECTIONS.PRODUCTS, file);
        // fs.unlinkSync(file.path);
      }
    }

    const transportationData = {
      status: true,
      data: { ...newBodyProduct, _id: resultInsertOne.insertedId },
    };

    req.loggingData = {
      log: 'Add new products',
      operation: 'insertOne for collection PRODUCTS',
      'req.body': req.body,
      result: transportationData.data,
    };
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

    if (!result)
      throw new ExtendedError({
        messageLog: 'Poor collection findOneAndDelete result.',
        messageJson: 'Помилка сервера. Не вдалося видалити продукт.',
      });

    const transportationData = {
      status: true,
      data: id,
    };

    req.loggingData = {
      log: 'Deleted products',
      operation: 'findOneAndDelete for collection PRODUCTS',
      'req.body': req.body,
      result: transportationData.data,
    };
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
