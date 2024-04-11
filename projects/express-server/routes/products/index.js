const router = require('express').Router();

const { log } = require('../../tools');
const { ObjectId } = require('mongodb');
const axios = require('axios');

const { DB, COLLECTIONS } = require('../../common_constants/db');

router.post('/info', async (req, res) => {
  try {
    console.log('test 1');
    console.log('test 2', req.body);

    const transportation_data = {
      status: true,
      library: 'test 3',
    };

    res.json(transportation_data);
  } catch ({ message, stack }) {
    log.errorT({ log: 'LIBRARY error', method: req.method, url: req.originalUrl, line: stack?.match(/.*index.js:(\d+):\d+/)?.[1], err: message });
    res.status(500).json({ status: false, err: message });
  }
});

module.exports = router;
