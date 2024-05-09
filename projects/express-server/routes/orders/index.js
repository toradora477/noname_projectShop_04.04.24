const router = require('express').Router();

const { DB, COLLECTIONS } = require('../../common_constants/db');
const { guestJWT } = require('../../middlewares/jwtAudit');
const { ExtendedError, getNextSequenceValue } = require('../../tools');
const { ObjectId } = require('mongodb');

router.post('/addOrder', guestJWT, async (req, res, next) => {
  try {
    const { listID } = req.body;

    const userID = req.user?._id ?? null;

    if (![listID].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const [commonParams, orders] = [
      req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.ORDERS),
    ];

    const bodyOrder = {
      t: new Date(),
      i: await getNextSequenceValue('orderNextSequenceValue', commonParams),
      l: listID.map((id) => (id = new ObjectId(id))),
      ...(userID ? { а: new ObjectId(userID) } : {}),
    };

    const resultInsertOne = await orders.insertOne(bodyOrder);

    if (!resultInsertOne?.insertedId)
      throw new ExtendedError({
        messageLog: 'Poor collection insertOne result.',
        messageJson: 'Помилка сервера. Не вдалося завантажити новий продукт.',
      });

    const transportationData = {
      status: true,
      data: { ...bodyOrder, _id: resultInsertOne.insertedId },
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
