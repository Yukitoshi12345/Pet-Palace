const router = require('express').Router();
const paymentRoutes = require('./payment-routes');

router.use('/payments', paymentRoutes);

module.exports = router;
