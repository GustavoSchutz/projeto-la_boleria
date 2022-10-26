import express from 'express';
import { cakesRouter } from './cakes.routes.js';
import { clientsRouter } from './clients.routes.js';
import { ordersRouter } from './orders.routes.js';

const router = express.Router();
router.use(cakesRouter);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;