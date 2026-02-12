const Joi = require('joi');

const registerTeacherSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'O nome é obrigatório',
    'string.min': 'O nome deve ter pelo menos 3 caracteres'
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'O e-mail é obrigatório',
    'string.email': 'Formato de e-mail inválido'
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.min': 'A senha deve ter pelo menos 6 caracteres'
  })
});

const loginTeacherSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'O e-mail é obrigatório',
    'string.email': 'Formato de e-mail inválido'
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.min': 'A senha deve ter pelo menos 6 caracteres'
  })
});

module.exports = {
  registerTeacherSchema,
  loginTeacherSchema
};

