const router = require('express').Router();
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { authenticateJWT } = require('../../middlewares/jwtAudit');
const { ExtendedError, getNextSequenceValue } = require('../../tools');
const { ObjectId } = require('mongodb');
const { ACTION } = require('../../common_constants/business');

router.patch('/changeFavorites', authenticateJWT, async (req, res, next) => {
  try {
    const { productId, action } = req.body;

    const userID = req.user?._id ?? null;

    if (![productId, action, userID].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const clients = req.app.locals.client.db(DB).collection(COLLECTIONS.CLIENTS);

    const findDB = { _id: new ObjectId(userID) };

    let updateOperation;
    if (action === ACTION.ADD) {
      updateOperation = { $addToSet: { fav: productId } };
    } else if (action === ACTION.REMOVE) {
      updateOperation = { $pull: { fav: productId } };
    } else {
      throw new ExtendedError({
        messageLog: 'Invalid action specified.',
        messageJson: 'Помилка клієнта. Невірна дія.',
        code: 400,
      });
    }

    const result = await clients.updateOne(findDB, updateOperation, { upsert: true });

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      throw new ExtendedError({
        messageLog: 'Failed to update favorites.',
        messageJson: 'Помилка сервера. Не вдалося оновити список обраних.',
        code: 500,
      });
    }

    const transportationData = {
      status: true,
      data: result,
    };

    req.setLoggingData({
      log: `${action} favorites product`,
      operation: 'update for collection CLIENTS',
      result: result ?? null,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
