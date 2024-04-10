const DATE_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

const LOG_EVENT_TYPE = {
  SERVER: 'server',
  USER: 'user',
};

module.exports = { DATE_OPTIONS, LOG_EVENT_TYPE };
