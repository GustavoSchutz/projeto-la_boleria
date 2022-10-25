import { sign } from 'jsonwebtoken';
import * as cakesRepo from '../repositories/cakes.repository.js';
import { conflictResponse } from './controllers.helper.js';

async function newCake (req, res) {
    const { name, price, image, description } = req.body;

    if (!name || !price || !image || !description) {
        return badRequestResponse(
            res,
            'Os campos não estão preenchidos corretamente!'
        );
    }

    const getCake = await cakesRepo.getCakeByName({
        name
    });

    const isAvailable = getCake.rowCount === 0;

    if (!isAvailable) {
        return conflictResponse(
            res,
            'Já existe um bolo com esse nome'
        )
    }

    try {
        await cakesRepo.insertCake({
            name,
            price,
            image,
            description
        })
    }
}