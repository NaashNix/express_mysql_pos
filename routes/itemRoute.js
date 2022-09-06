const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.post('/', itemController.saveItem);
router.get('/',itemController.getAllItems);


module.exports = router;