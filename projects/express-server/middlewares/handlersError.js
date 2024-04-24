const handlersError = (err, req, res, next) => {
  if (err) {
    const { message, stack, messageJson, сode = 500 } = err;
    req.loggingData = { message, stack };
    res.status(сode).json({ status: false, errMessage: messageJson ?? message });
  } else {
    next();
  }
};

module.exports = handlersError;
