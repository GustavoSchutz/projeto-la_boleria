import * as clientsRepo from '../repositories/clients.repository.js';
import { conflictResponse, badRequestResponse, internalServerError, unprocessableEntityResponse, createdResponse } from './controllers.helper.js';
import { newClientSchema } from '../schemas/schemas.js';

async function newClient(req, res) {
    const { name, address, phone } = req.body;

    const validation = newClientSchema.validate(req.body);

    if (validation.error) {
        console.log(validation.error.details[0].path[0]);
        return badRequestResponse(
            res,
            'Os campos não estão preenchidos corretamente!'
        );
    }

    try {

        const insertClient = await clientsRepo.insertClient({
            name,
            address,
            phone
        });

        console.log(insertClient);
        return createdResponse(
            res,
            "Novo cliente cadastrado com sucesso!"
        )

    } catch (error) {
        console.log(error);

        return internalServerError(
            res,
            'Erro interno teste'
        );
    }
}

export { newClient };