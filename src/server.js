import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from '../db/db.js';
import router from './routes/routes.js';

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

server.get('/status', async (req, res) => {
    const result = await connection.query('SELECT 1=1');
    res.send(result.rows);
});

server.listen(process.env.PORT, () => {
    console.log(`Magic happens on ${process.env.PORT}`);
});