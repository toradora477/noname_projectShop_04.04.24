const router = require('express').Router();
const multer = require('multer');
const { log, getNextSequenceValue, ExtendedError } = require('../../tools');
const { ObjectId } = require('mongodb');
const { adminJWT } = require('../../middlewares/jwtAudit');
const path = require('path');
const { DB, COLLECTIONS } = require('../../common_constants/db');

router.post('/info', (req, res, next) => {
  try {
    console.log('test 1');
    console.log('test 2', req.body);

    const transportationData = {
      status: true,
      library: 'test 3',
    };

    res.json(transportationData);
  } catch (err) {
    next(err);
  }
}); // TODO тестовий, прибрати

router.get('/getListAllProducts', async (req, res, next) => {
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

router.post('/addProduct', adminJWT, multer({ dest: path.join(__dirname, './') }).single('file'), async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    console.log('req.files', req.files);
    console.log('req.user', req.user);

    const { productName, description, price, colors } = req.body;
    const { _id: userID } = req.user;

    if (![userID, !productName, price].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    console.log(userID);

    console.log(ObjectId.createFromTime(userID));
    console.log(new ObjectId(userID));

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

module.exports = router;
