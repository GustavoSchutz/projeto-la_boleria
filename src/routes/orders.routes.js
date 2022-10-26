import express from 'express';
import { getOrders, newOrder, getOrdersById } from '../controllers/orders.controller.js';

const ordersRouter = express.Router();
ordersRouter.post('/orders', newOrder);
ordersRouter.get('/orders', getOrders);
ordersRouter.get('/orders/:id', getOrdersById);

export { ordersRouter };