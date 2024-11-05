// routes.js or index.js
import express from 'express';
import { userSignUp ,userLogin } from './auth-routes.js'; // Ensure to include the .js extension
import { getProducts } from './product-routes.js';
import { addToCart,removeCart ,getCart} from './cart-routes.js';

const router = express.Router();

// User Routes
router.post('/user/user-signup', userSignUp);
router.post('/user/user-login', userLogin);
router.get('/user/get-products', getProducts);
router.post('/user/add-to-cart', addToCart);
router.post('/user/remove-cart', removeCart);
router.get('/user/get-cart/:userId', getCart);

export default router; 