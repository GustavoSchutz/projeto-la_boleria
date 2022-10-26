import express from 'express';
import { newClient } from '../controllers/clients.controller.js';

const clientsRouter = express.Router();
clientsRouter.post('/clients', newClient);

export { clientsRouter };