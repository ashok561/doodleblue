const express = require('express');
const router = express.Router();
const {protect } = require('../middleware/auth');
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct } =  require('../controllers/product');

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;