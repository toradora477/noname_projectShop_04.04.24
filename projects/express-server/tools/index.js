const logger = require('log-beautify');
const { DATE_OPTIONS } = require('../common_constants/business');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const colors = {
  success: 'green',

  warning: 'magenta',
};

// // Встановлення кольорів для кожного рівня журналу
Object.keys(colors).forEach((level) => {
  logger.setColors({
    [level]: colors[level],
  });
});

const log = {
  success: (rest) => {
    logger.success('Success: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  ok: (rest) => {
    logger.ok('Ok: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  debug: (rest) => {
    logger.debug('Debug: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  info: (rest) => {
    logger.info('Info: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  warning: (rest) => {
    logger.warning('Warning: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  warn: (rest) => {
    logger.warn('Warn: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  error: (rest) => {
    logger.error('Error: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  show: (rest) => {
    logger.show('Show: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
};

log.success('1');
log.ok('1');
log.debug('1');
log.info('1');
log.warning('1');
log.warn('1');
log.error('1');
log.show('1');

class ExtendedError extends Error {
  /**
   * Custom error constructor.
   * @param {string} messageLog - The log message for the error.
   * @param {number} code - The HTTP status code associated with the error (default is 500).
   * @param {string} messageJson - The JSON-formatted message for the error (optional).
   */
  constructor(messageLog, code = 500, messageJson) {
    super(messageLog);
    this.name = 'ExtendedError';
    this.code = code;
    this.messageJson = messageJson;
  }
}

module.exports = {
  log,
  ExtendedError,
};
