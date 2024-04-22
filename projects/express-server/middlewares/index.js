const router = require('express').Router();
const { log } = require('../tools');
const dayjs = require('dayjs');
const { HTTP_METHODS } = require('../common_constants/business');

const logRequestFinish = function (req, res, next) {
  const startTime = dayjs();

  res.on('finish', function () {
    const endTime = dayjs(),
      duration = (endTime.diff(startTime) / 1000).toFixed(3);

    const method = req.method;

    const url = method === HTTP_METHODS.GET?.toUpperCase() ? req.originalUrl.split('?')[0] : req.originalUrl;

    const customLogInfo = typeof req.logInfo === 'object' && req.logInfo !== null ? req.logInfo : {};

    const status = res.statusCode;

    const dataTransfer = {
      url,
      method,
      status: res.statusCode,
      duration: `${duration} seconds`,
      ...customLogInfo,
    };

    const statusСircumcised = Math.floor(status / 100).toString();

    (
      ({
        4: () => log.warn(dataTransfer),
        5: () => log.error(dataTransfer),
      })[statusСircumcised] || (() => log.info(dataTransfer))
    )();
  });

  next();
};

router.use(logRequestFinish);

module.exports = router;
