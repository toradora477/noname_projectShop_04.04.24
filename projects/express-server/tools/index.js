const logger = require('log-beautify');

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
   * @param {Object} options - Object containing error properties.
   * @param {string} options.messageLog - The log message for the error.
   * @param {number} [options.code=500] - The HTTP status code associated with the error.
   * @param {string} [options.messageJson] - The JSON-formatted message for the error (optional).
   */
  constructor({ messageLog = 'Unknown error occurred.', code = 500, messageJson = null }) {
    if (typeof messageLog !== 'string') {
      throw new TypeError('messageLog must be a string.');
    }
    if (code < 400 || code >= 600) {
      throw new RangeError('code must be in the range 400-599.');
    }
    super(messageLog);
    this.name = 'ExtendedError';
    this.code = code;
    this.messageJson = messageJson;
  }

  /**
   * Convert error object to JSON.
   * @returns {Object} JSON representation of the error.
   */
  toJSON() {
    const jsonError = {
      name: this.name,
      message: this.message,
      code: this.code,
    };
    if (this.messageJson) {
      jsonError.messageJson = this.messageJson;
    }
    return jsonError;
  }
}
module.exports = {
  log,
  ExtendedError,
  getNextSequenceValue,
};
