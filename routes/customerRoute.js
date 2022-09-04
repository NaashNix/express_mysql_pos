const { application } = require('express');
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');


router.get('/',customerController.getAllCustomers);
router.post('/',customerController.saveCustomer);

module.exports = router;