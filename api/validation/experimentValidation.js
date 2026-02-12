const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createExperimentSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "any.required": "O título do experimento é obrigatório",
    "string.min": "O título deve ter pelo menos 3 caracteres",
  }),
  titleActivity: Joi.string().min(3).required().messages({
    "any.required": "O título da atividade é obrigatório",
    "string.min": "O título da atividade deve ter pelo menos 3 caracteres",
  }),
  description: Joi.string().min(10).required().messages({
    "any.required": "A descrição é obrigatória",
    "string.min": "A descrição deve ter pelo menos 10 caracteres",
  }),
});

const updateExperimentSchema = Joi.object({
  pinRoom: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "O PIN da sala deve conter exatamente 4 dígitos",
      "string.pattern.base": "O PIN da sala só pode conter números",
    }),
  title: Joi.string().min(3).messages({
    "string.min": "O título deve ter pelo menos 3 caracteres",
  }),
  titleActivity: Joi.string().min(3).messages({
    "string.min": "O título da atividade deve ter pelo menos 3 caracteres",
  }),
  description: Joi.string().min(10).messages({
    "string.min": "A descrição deve ter pelo menos 10 caracteres",
  }),
  liberateRoom: Joi.boolean(),
  liberateResult: Joi.boolean(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
})
  .min(1)
  .messages({
    "object.min": "Pelo menos um campo para atualização deve ser fornecido.",
  });

const experimentIdSchema = Joi.objectId().required().messages({
  "any.required": "O ID do experimento é obrigatório",
  "string.empty": "O ID do experimento não pode ser vazio",
  "objectId.base": "O ID do experimento deve ser um ObjectId válido",
});

const teacherIdSchema = Joi.objectId().required().messages({
  "any.required": "O ID do professor é obrigatório",
  "string.empty": "O ID do professor não pode ser vazio",
  "objectId.base": "O ID do professor deve ser um ObjectId válido",
});

const pinSchema = Joi.object({
  pin: Joi.string()
    .length(4)
    .pattern(/^[0-9]{4}$/)
    .required()
    .messages({
      "string.length": "O PIN deve conter exatamente 4 dígitos",
      "string.pattern.base": "O PIN só pode conter números",
      "any.required": "O PIN é obrigatório",
    }),
});

module.exports = {
  createExperimentSchema,
  updateExperimentSchema,
  experimentIdSchema,
  teacherIdSchema,
  pinSchema,
};
