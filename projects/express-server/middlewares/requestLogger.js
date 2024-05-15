const { log } = require('../tools');
const dayjs = require('dayjs');
const { HTTP_METHODS } = require('../common_constants/business');

const requestLogger = (req, res, next) => {
  const startTime = dayjs();

  req.setLoggingData = function (data) {
    if (Object.prototype.toString.call(data) === '[object Object]' && Object.keys(data).length > 0)
      this.loggingData = { ...(this.loggingData ??= {}), ...data };
  };

  res.on('finish', () => {
    const endTime = dayjs();
    const duration = (endTime.diff(startTime) / 1000).toFixed(3);
    const method = req.method;
    const url = method === HTTP_METHODS.GET?.toUpperCase() ? req.originalUrl.split('?')[0] : req.originalUrl;
    const status = res.statusCode;
    const statusCategory = Math.floor(status / 100).toString();
    const initiator = `${req.user?.role ?? 'guest'} - ${req.user?.email ?? 'anonymous'}`;

    let customLogInfo =
      Object.prototype.toString.call(req.loggingData) === '[object Object]' && Object.keys(req.loggingData).length > 0 ? req.loggingData : null;

    if (customLogInfo?.stack) {
      const match = customLogInfo.stack?.match(/.*[\\\/]([^\\\/]+)[\\\/]([^\\\/]+\.js):(\d+):\d+/);

      const fileName = match?.[2] ?? null;
      const folderName = match?.[1] ?? null;

      const address = folderName && fileName ? `\\${folderName}\\${fileName}` : undefined;

      customLogInfo.address = address;
      customLogInfo.line = customLogInfo.stack?.match(/.*:(\d+):\d+/)?.[1];
      customLogInfo.stack = undefined;
    }

    const logLevel =
      {
        4: 'logWarn',
        5: 'logError',
      }[statusCategory] || 'logInfo';

    const dataTransfer = {
      url,
      method,
      status,
      duration: `${duration} seconds`,
      initiator,
      ...(customLogInfo ? { [logLevel]: customLogInfo } : {}),
    };

    const logFunction =
      {
        4: log.warn,
        5: log.error,
      }[statusCategory] || log.info;

    logFunction(dataTransfer);
  });

  next();
};

module.exports = requestLogger;
