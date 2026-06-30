const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().optional()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
};