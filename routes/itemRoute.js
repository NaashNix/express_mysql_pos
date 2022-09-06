const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.post('/', itemController.saveItem);
router.get('/',itemController.getAllItems);
router.put('/', itemController.updateItem);
router.delete('/:code',itemController.deleteItem);
router.get('/:code', itemController.searchItem);

module.exports = router;