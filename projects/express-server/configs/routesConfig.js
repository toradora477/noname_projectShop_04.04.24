const router = require('express').Router();

router.use('/products', require('../routes/products'));

module.exports = router;
