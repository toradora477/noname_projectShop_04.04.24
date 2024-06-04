const router = require('express').Router();

const { DB, COLLECTIONS } = require('../../common_constants/db');
const { guestJWT, adminJWT } = require('../../middlewares/jwtAudit');
const { ExtendedError, getNextSequenceValue } = require('../../tools');
const { ObjectId } = require('mongodb');

router.patch('/:orderId/archiveOrder', adminJWT, async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const userID = req.user?._id;

    if (![orderId, userID].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const orders = req.app.locals.client.db(DB).collection(COLLECTIONS.ORDERS);
    const commonParams = req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS);

    const findDB = { _id: new ObjectId(orderId) };

    const data = {
      ag: {
        ai: await getNextSequenceValue('orderArchiveNextSequenceValue', commonParams),
        ad: new Date(),
        al: new ObjectId(userID),
      },
    };

    const updateDB = {
      $set: data,
    };
    const result = await orders.updateOne(findDB, updateDB, { upsert: true });

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      throw new ExtendedError({
        messageLog: 'Failed to update order.',
        messageJson: 'Помилка сервера. Не вдалося оновити замовлення.',
        code: 500,
      });
    }

    const transportationData = {
      status: true,
      data: data,
    };

    req.setLoggingData({
      log: `Archive oreder`,
      operation: 'updateOne for collection ORDERS',
      findDB,
      updateDB,
      result: result ?? null,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
}); // TODO доробити сторону на реакті

router.get('/getListOrder', adminJWT, async (req, res, next) => {
  try {
    const orders = req.app.locals.client.db(DB).collection(COLLECTIONS.ORDERS);

    const pipeline = [
      {
        $lookup: {
          from: COLLECTIONS.CLIENTS,
          localField: 'a',
          foreignField: '_id',
          as: 'authorInfo',
        },
      },
      {
        $set: {
          authorInfo: {
            $cond: {
              if: { $gt: [{ $size: '$authorInfo' }, 0] },
              then: { $arrayElemAt: ['$authorInfo', 0] },
              else: null,
            },
          },
        },
      },
      { $sort: { i: -1 } },
    ];

    const resultAggregation = await orders.aggregate(pipeline).toArray();

    if (!resultAggregation?.length || !Array.isArray(resultAggregation))
      throw new ExtendedError({
        messageLog: 'Poor collection aggregation result.',
        messageJson: 'Помилка сервера. Не вдалося вивантажити список замовлень.',
      });

    const transportationData = {
      status: true,
      data: resultAggregation,
    };

    req.setLoggingData({
      log: 'Get all list orders',
      operation: 'aggregation for collection ORDERS with CLIENTS',
      dataLength: resultAggregation?.length ?? null,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

router.post('/addOrder', guestJWT, async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, deliveryMethod, paymentMethod, region, city, address, recipient, products } = req.body;

    const userID = req.user?._id ?? null;

    if (![firstName, lastName, phoneNumber, email, deliveryMethod, paymentMethod, region, city, address, recipient, products].every(Boolean))
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
      firstName,
      lastName,
      phoneNumber,
      ...(email ? { email: email } : {}),
      deliveryMethod,
      paymentMethod,
      region,
      city,
      address,
      recipient,
      products: products.map((item) => ({ ...item, productId: new ObjectId(item.productId) })),
      ...(userID ? { a: new ObjectId(userID) } : {}),
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

module.exports = router;
