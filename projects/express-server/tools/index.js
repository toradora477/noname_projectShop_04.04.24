const logger = require('log-beautify');
const { DATE_OPTIONS } = require('../common_constants/business');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const getNextSequenceValue = async (sequenceName, collection) => {
  const filter = { name: sequenceName };
  const updateIncrement = { $inc: { value: 1 } };
  const updateIfNull = { $set: { value: 2 } };
  const options = { upsert: true };

  const sequenceDocument = await collection.findOneAndUpdate(filter, updateIncrement, options);

  if (!sequenceDocument?.value) {
    const updatedResult = await collection.findOneAndUpdate(filter, updateIfNull);

    return updatedResult.value;
  }

  return sequenceDocument.value;
};

const log = {
  success: (rest) => {
    logger.success(rest);
  },
  debug: (rest) => {
    logger.debug('Debug: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  info: (rest) => {
    logger.info('Info: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  warn: (rest) => {
    logger.warn('Warn: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  error: (rest) => {
    logger.error('Error: ' + dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss') + ':', rest);
  },
  show: (rest) => {
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
  getNextSequenceValue,
};
