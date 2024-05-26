const handlersError = (err, req, res, next) => {
  if (err) {
    const { message, stack, messageJson, code = 500 } = err;

    req.setLoggingData({ message, stack });
    res.status(code).json({ status: false, errMessage: messageJson ?? message });
  } else {
    next();
  }
};

module.exports = handlersError;
