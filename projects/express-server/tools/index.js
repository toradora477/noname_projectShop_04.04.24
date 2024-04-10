const logger = require('log-beautify');
const fs = require('fs');
const { DATE_OPTIONS, LOG_EVENT_TYPE } = require('../common_constants/business');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const writeLogToFile = (content) => {
  const { eventType, log } = content;
  try {
    const now = dayjs();
    const dateStr = `${now.year()}-${now.month() + 1}-${now.date()}`;
    const item = { date: now, log };

    fs.writeFile(`./log/${eventType}/` + dateStr + '.txt', '\n' + JSON.stringify(item), { flag: 'a' }, (err) => {
      if (err) {
        logger.error(err);
        return;
      }
    });
  } catch (err) {
    logger.error(err);
  }
};

const log = {
  success: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.success(rest);
  },
  ok: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.ok(rest);
  },
  debug: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.debug(rest);
  },
  info: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.info(new Date(), rest);
  },
  warning: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.warning(rest);
  },
  warn: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.warn(rest);
  },
  errorT: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.error('Error: ' + new Date().toLocaleDateString('en-US', DATE_OPTIONS) + ':', rest);
  },
  error: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.error(rest);
  },
  show: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.SERVER, log: rest });
    logger.show(rest);
  },
  userAction: (rest) => {
    writeLogToFile({ eventType: LOG_EVENT_TYPE.USER, log: rest });
    logger.show(rest);
  },
};

class CustomError extends Error {
  /**
   * Custom error constructor.
   * @param {string} messageLog - The log message for the error.
   * @param {number} code - The HTTP status code associated with the error (default is 500).
   * @param {string} messageJson - The JSON-formatted message for the error (optional).
   */
  constructor(messageLog, code = 500, messageJson) {
    super(messageLog);
    this.name = 'CustomError';
    this.code = code;
    this.messageJson = messageJson;
  }
}

module.exports = {
  log,
  CustomError,
};
