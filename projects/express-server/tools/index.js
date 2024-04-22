const logger = require('log-beautify');
const { DATE_OPTIONS } = require('../common_constants/business');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const log = {
  success: (rest) => {
    logger.success(rest);
  },
  ok: (rest) => {
    logger.ok(rest);
  },
  debug: (rest) => {
    logger.debug(rest);
  },
  info: (rest) => {
    logger.info('Info: ' + new Date().toLocaleDateString('en-US', DATE_OPTIONS) + ':', rest);
  },
  warning: (rest) => {
    logger.warning(rest);
  },
  warn: (rest) => {
    logger.warn('Warn: ' + new Date().toLocaleDateString('en-US', DATE_OPTIONS) + ':', rest);
  },
  error: (rest) => {
    logger.error('Error: ' + new Date().toLocaleDateString('en-US', DATE_OPTIONS) + ':', rest);
  },
  show: (rest) => {
    logger.show(rest);
  },
  userAction: (rest) => {
    logger.show(rest);
  },
};

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
