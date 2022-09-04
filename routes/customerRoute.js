const { application } = require('express');
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');


router.get('/',customerController.getAllCustomers);
router.post('/',customerController.saveCustomer);
router.delete('/:id',customerController.deleteCustomer);
router.put('/',customerController.updateCustomer);
router.get('/:id', customerController.searchCustomer);

module.exports = router;