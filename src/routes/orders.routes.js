import express from 'express';
import { getOrders, newOrder } from '../controllers/orders.controller.js';

const ordersRouter = express.Router();
ordersRouter.post('/orders', newOrder);
ordersRouter.get('/orders', getOrders);

export { ordersRouter };