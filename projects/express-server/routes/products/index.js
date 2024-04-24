const router = require('express').Router();
const multer = require('multer');
const { log, getNextSequenceValue, ExtendedError } = require('../../tools');
const { ObjectId } = require('mongodb');

const path = require('path');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { PRODUCTS } = require('../../common_constants/testDataBase');

router.post('/info', async (req, res) => {
  try {
    console.log('test 1');
    console.log('test 2', req.body);

    const transportationData = {
      status: true,
      library: 'test 3',
    };

    res.json(transportationData);
  } catch ({ message, stack }) {
    log.error({ log: 'Error', method: req.method, url: req.originalUrl, line: stack?.match(/.*index.js:(\d+):\d+/)?.[1], err: message });
    res.status(500).json({ status: false, err: message });
  }
});

router.get('/getListAllProducts', (req, res) => {
  try {
    const transportationData = {
      status: true,
      data: PRODUCTS,
    };

    res.status(200).json(transportationData);

    req.loggingData = {
      dataLength: transportationData.data?.length ?? null,
      operation: 'Get all list products',
    };
  } catch ({ message, stack }) {
    log.error({ log: 'Error', method: req.method, url: req.originalUrl, line: stack?.match(/.*index.js:(\d+):\d+/)?.[1], err: message });
    res.status(500).json({ status: false, err: message });
  }
});

router.post('/addProduct', multer({ dest: path.join(__dirname, './') }).single('file'), async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.files', req.files);

    const { productName, description, price, colors } = req.body;

    const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.PRODUCTS);
    const commonParams = req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS);

    const newBodyProduct = {
      ...(productName ? { n: productName } : {}),
      ...(price ? { p: price } : {}),
      ...(description ? { d: description } : {}),
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
  } catch ({ message, stack, messageJson, сode = 500 }) {
    req.loggingData = { errLine: stack?.match(/.*index.js:(\d+):\d+/)?.[1], errMessage: message };
    res.status(сode).json({ status: false, errMessage: messageJson ?? message });
  }
});

module.exports = router;
