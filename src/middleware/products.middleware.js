import {insertProductSchema} from '../schema/product.schema.js'

export async function insertProductValidate(request, response, next) {
    const {error } = insertProductSchema.validate(request.body)
    if(error)
        return response.status(400).send('invalid payload')
    else
        next()
}