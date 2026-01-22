import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controller/productController.js';
import {notAllowed } from '../utils/notAllowed.js';
const router = express.Router();

router.route('/api/products').get(getProducts).post(createProduct).all(notAllowed);
router.route('/api/products/:id').get(getProduct).patch(updateProduct).delete(deleteProduct).all(notAllowed);


export default router;