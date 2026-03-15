const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct, getLowStockAlerts } = require('../controllers/product.controller');
const authenticate = require('../middleware/auth.middleware');

router.get('/', authenticate, getProducts);
router.post('/', authenticate, addProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.get('/alerts', authenticate, getLowStockAlerts);

module.exports = router;
