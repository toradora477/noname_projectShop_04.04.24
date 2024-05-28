const router = require('express').Router();
const { ExtendedError } = require('../../tools');
const { guestJWT } = require('../../middlewares/jwtAudit');
const axios = require('axios');

router.get('/getNovaPoshtaBranches', guestJWT, async (req, res, next) => {
  try {
    const API_NOVA_POSHTA_KEY = process.env.API_NOVA_POSHTA_KEY;
    const API_NOVA_POSHTA_URL = process.env.API_NOVA_POSHTA_URL;

    const response = await axios.post(API_NOVA_POSHTA_URL, {
      apiKey: API_NOVA_POSHTA_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
    });

    if (!response?.data?.success || !response?.data?.data) {
      throw new ExtendedError({
        messageLog: 'Poor axios post result.',
        messageJson: 'Помилка сервера. Не вдалося завантажити список відділень.',
      });
    }

    const filteredData = response.data.data.map((branch) => ({
      Description: branch.Description,
      SettlementAreaDescription: branch.SettlementAreaDescription,
      SettlementDescription: branch.SettlementDescription,
    }));

    const transportationData = {
      status: true,
      data: filteredData,
    };

    req.setLoggingData({
      log: 'Get filtered list nova poshta branches',
      operation: 'axios post api nova poshta',
      dataLength: transportationData?.data?.length ?? null,
    });
    res.status(200).json(transportationData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
