const router = require('express').Router();
const multer = require('multer');
const { log, getNextSequenceValue } = require('../../tools');
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

    req.logInfo = {
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
      n: productName,
      p: price,
      d: description,
      i: await getNextSequenceValue('productNextSequenceValue', commonParams),
    };

    const resultInsertOne = await collection.insertOne(newBodyProduct);

    log.show(resultInsertOne);

    const transportationData = {
      status: true,
      data: { ...newBodyProduct, _id: resultInsertOne.insertedId },
    };

    res.status(200).json(transportationData);

    req.logInfo = { operation: 'add products', 'req.body': req.body, result: transportationData.data };
  } catch ({ message, stack }) {
    req.logInfo = { errLine: stack?.match(/.*index.js:(\d+):\d+/)?.[1], errMessage: message };

    res.status(500).json({ status: false, err: message });
  }
});

module.exports = router;
