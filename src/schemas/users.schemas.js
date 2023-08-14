import joi from "joi"

export const userSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().max(11).required(),
    email: joi.string().email().required(),
    phone: joi.number().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
})
