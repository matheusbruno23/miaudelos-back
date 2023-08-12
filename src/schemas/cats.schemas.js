import joi from "joi"

export const catSchema = joi.object({
    name: joi.string().required(),
    photo_url: joi.string().uri().required(),
    characteristics: joi.string().required(),
    active: joi.boolean()
})