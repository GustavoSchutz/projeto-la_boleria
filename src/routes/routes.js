import express from 'express';
import { cakesRouter } from './cakes.routes.js';

const router = express.Router();
router.use(cakesRouter);

export default router;