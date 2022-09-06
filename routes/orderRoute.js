const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/',orderController.getAllOrders);
router.post('/',orderController.saveOrder);
router.delete('/:orderID',orderController.deleteOrder);

module.exports = router; 