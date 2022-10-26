import * as cakesRepo from '../repositories/cakes.repository.js';
import { conflictResponse, badRequestResponse, internalServerError, unprocessableEntityResponse, createdResponse } from './controllers.helper.js';
import { newCakeSchema } from '../schemas/schemas.js';

async function newCake(req, res) {
    const { name, price, image, description } = req.body;

    const newCakeData = req.body;

    const validation = newCakeSchema.validate(newCakeData);
    if (validation.error) {
        console.log(validation.error.details[0].path[0]);
        if (validation.error.details[0].path[0] === 'image'){
            return unprocessableEntityResponse(
                res,
                'O endereço da imagem precisa ser um link em formato válido ex: "https://example.com"'
            )
        }
        return res.sendStatus(400);
    }

    try {
        const insertCake = await cakesRepo.insertCake({
            name,
            price: price * 100,
            image,
            description
        });

        console.log(insertCake);
        return createdResponse(
            res,
            "Novo bolo criado com sucesso!"
        )

    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return conflictResponse(
                res,
                'Já existe um bolo com esse nome'
            );
        }

        return internalServerError(
            res,
            'Erro interno teste'
        );
    }

    return internalServerError(
        res,
        'Erro interno'
    );

}

export { newCake };