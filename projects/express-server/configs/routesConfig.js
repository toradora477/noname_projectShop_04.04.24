const router = require('express').Router();

router.use('/products', require('../routes/products'));
router.use('/auth', require('../routes/auth'));
router.use('/api', require('../routes/api'));

module.exports = router;
