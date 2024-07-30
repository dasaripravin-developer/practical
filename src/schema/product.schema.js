import Joi from 'joi'

const insertProductSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(2).required(),
    price: Joi.number().min(10).required()
})

export {
    insertProductSchema
}