const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/',orderController.getAllOrders);

module.exports = router; 