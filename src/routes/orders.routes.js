import express from 'express';
import { getOrders, newOrder, getOrdersById, getOrdersByClientId } from '../controllers/orders.controller.js';

const ordersRouter = express.Router();
ordersRouter.post('/orders', newOrder);
ordersRouter.get('/orders', getOrders);
ordersRouter.get('/orders/:id', getOrdersById);
ordersRouter.get('/clients/:id/orders', getOrdersByClientId);

export { ordersRouter };