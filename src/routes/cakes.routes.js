import express from 'express';
import { newCake } from '../controllers/cakes.controller.js';

const cakesRouter = express.Router();
cakesRouter.post('/cakes', newCake);

export { cakesRouter };