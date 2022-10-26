import joi from 'joi';

const newCakeSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().min(.01).required(),
    image: joi.string().uri().required(),
    description: joi.string().allow("")
});

const newClientSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().min(10).max(11)
});

const newOrderSchema = joi.object({
    clientId: joi.number().integer().min(1).required(),
    cakeId: joi.number().integer().min(1).required(),
    quantity:  joi.number().integer().min(1).max(4)
});

export { newCakeSchema, newClientSchema, newOrderSchema };