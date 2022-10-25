import joi from 'joi';

const newCakeSchema = joi.object({
    name: joi.string().min(2),
    price: joi.number(),
    image: joi.(),
    description
})