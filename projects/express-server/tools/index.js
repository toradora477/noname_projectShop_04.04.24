const logger = require('log-beautify');
const fs = require('fs');
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

const checkEnvVariables = () => {
  if (!fs.existsSync('firebase-adminsdk.json')) log.serverError('firebase-adminsdk.json missing');
  if (fs.existsSync('.env')) {
    if (!process.env.TOKEN_SECRET) log.serverError('TOKEN_SECRET empty');
    if (!process.env.MONGO_URL) log.serverError('MONGO_URL empty');
    if (!process.env.STORAGE_BUCKET) log.serverError('STORAGE_BUCKET empty');
  } else {
    log.serverError('.env missing');
  }
};

const configureLogger = () => {
  logger.setSymbols({
    ok: '[server]',
    warning: '[server]',
  });
  logger.setColors({
    warning: 'orangered',
  });
};

const runInitialSettings = () => {
  configureLogger();
  checkEnvVariables();
};

const log = {
  serverSuccess: (rest) => {
    logger.ok(rest);
  },
  serverError: (rest, err) => {
    if (err) {
      let address;
      const stack = err.stack;
      const fileAndLineMatch = stack?.match(/.*[\\\/]([^\\\/]+)[\\\/]([^\\\/]+\.js):(\d+):\d+/);
      const nodeModulesMatch = stack?.match(/.*[\\\/](node_modules[\\\/].*?):(\d+):\d+/);

      if (fileAndLineMatch) {
        const [_, folderName, fileName] = fileAndLineMatch;
        address = `\\${folderName}\\${fileName}`;
      }

      if (stack?.includes('node_modules') && nodeModulesMatch) {
        address = `${nodeModulesMatch[1]}:${nodeModulesMatch[2]}`;
      }

      const lineMatch = stack?.match(/.*:(\d+):\d+/);
      const line = lineMatch ? lineMatch[1] : 'N/A';

      logger.warning({
        CustomMessage: rest,
        Address: address ?? 'N/A',
        Line: line,
        Name: err.name,
        ErrorMessage: err.message,
        'Error Object': err,
      });
    } else {
      logger.warning(rest);
    }
  },
  logWithTimestamp: (level, rest) => {
    const timestamp = dayjs().format('dddd, MMMM D, YYYY [at] HH:mm:ss');
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    logger[level](`${capitalizeFirstLetter(level)}: ${timestamp}:`, rest);
  },
  success: (rest) => {
    log.logWithTimestamp('success', rest);
  },
  debug: (rest) => {
    log.logWithTimestamp('debug', rest);
  },
  info: (rest) => {
    log.logWithTimestamp('info', rest);
  },
  warn: (rest) => {
    log.logWithTimestamp('warn', rest);
  },
  error: (rest) => {
    log.logWithTimestamp('error', rest);
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
  runInitialSettings,
};
