import * as cakesRepo from '../repositories/cakes.repository.js';
import { conflictResponse, badRequestResponse } from './controllers.helper.js';
import { newCakeSchema } from '../schemas/schemas.js';

async function newCake (req, res) {
    const { name, price, image, description } = req.body;

    const newCakeData = req.body;

    const validation = newCakeSchema.validate(newCakeData);
    if (validation.error) {
        console.log(validation.error.details);
        return res.sendStatus(422);
    }

    if (!name || !price || !image || !description) {
        return badRequestResponse(
            res,
            'Os campos não estão preenchidos corretamente!'
        );
    }

    const getCake = await cakesRepo.getCakeByName({
        name
    });

    if (getCake) {
        return conflictResponse(
            res,
            'Já existe um bolo com esse nome'
        );
    }

    try {
        await cakesRepo.insertCake({
            name,
            price,
            image,
            description
        });
    }
}