import * as cakesRepo from '../repositories/cakes.repository.js';
import * as clientsRepo from '../repositories/clients.repository.js';
import * as ordersRepo from '../repositories/orders.repository.js';
import { conflictResponse, badRequestResponse, internalServerError, unprocessableEntityResponse, createdResponse, notFoundResponse } from './controllers.helper.js';
import { newOrderSchema } from '../schemas/schemas.js';
import { query } from 'express';

async function newOrder(req, res) {
    const { clientId, cakeId, quantity } = req.body;

    const validation = newOrderSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error.details[0].path[0]);
        return badRequestResponse(
            res,
            'Os campos não estão preenchidos corretamente!'
        );
    }

    const getClientById = await clientsRepo.getClientById(clientId);

    if (getClientById.rowCount === 0) {
        return notFoundResponse(
            res,
            'Nenhum usuário encontrado com este id.'
        );
    }

    const getCakeById = await cakesRepo.getCakeById(cakeId);

    if (getCakeById.rowCount === 0) {
        return notFoundResponse(
            res,
            'Nenhum bolo encontrado com este id.'
        );
    }

    const cakePrice = getCakeById.rows[0].price;

    const totalPrice = cakePrice * quantity;

    try {

        const insertOrder = await ordersRepo.insertOrder({
            clientId,
            cakeId,
            quantity,
            totalPrice
        });

        console.log(insertOrder);
        return createdResponse(
            res,
            "Novo pedido realizado com sucesso!"
        )

    } catch (error) {
        console.log(error);

        return internalServerError(
            res,
            'Erro interno teste'
        );
    }

}

async function getOrders(req, res) {

    const { date } = req.query;

    try {

        if (Object.keys(req.query).length === 0) {
            const getOrders = await ordersRepo.getOrders();

            console.log(getOrders);
            return res.status(200).send(getOrders.rows);
        }

        const getOrdersByDate = await ordersRepo.getOrdersByDate(date);

        if (getOrdersByDate.rowCount === 0) {
            return notFoundResponse(
                res,
                'Nenhum pedido encontrado na data especificada.'
            );
        }

        return res.status(200).send(getOrdersByDate.rows);
        
    } catch (error) {
        console.log(error);

        return internalServerError(
            res,
            'Erro interno teste'
        );
    }
}

    export { newOrder, getOrders };