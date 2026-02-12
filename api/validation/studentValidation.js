const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const registerStudentSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "O nome do aluno é obrigatório",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
  }),
  pin: Joi.string().length(4).required().messages({
    "any.required": "O PIN é obrigatório",
    "string.length": "O PIN deve conter exatamente 4 dígitos",
    "string.pattern.base": "O PIN só pode conter números",
  }),
});

const updateStudentAnswersSchema = Joi.object({
  studentId: Joi.objectId().required().messages({
    "any.required": "O ID do estudante é obrigatório",
    "objectId.base": "O ID do estudante deve ser um ObjectId válido",
  }),
  answers: Joi.array()
    .items(
      Joi.object({
        questionText: Joi.string().required().messages({
          "any.required": "O texto da questão é obrigatório",
        }),
        answerText: Joi.string().allow(null, "").messages({
          "string.empty":
            "O texto da resposta não pode ser vazio (se fornecido)",
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      "any.required": "As respostas são obrigatórias",
      "array.min": "Pelo menos uma resposta deve ser fornecida",
    }),
});

const studentIdParamSchema = Joi.object({
  id: Joi.objectId().required().messages({
    "any.required": "O ID do estudante é obrigatório",
    "objectId.base": "O ID do estudante deve ser um ObjectId válido",
  }),
});

const studentPinParamSchema = Joi.object({
  pin: Joi.string().length(4).required().messages({
    "any.required": "O PIN é obrigatório",
    "string.length": "O PIN deve conter exatamente 4 dígitos",
    "string.pattern.base": "O PIN só pode conter números",
  }),
});

module.exports = {
  registerStudentSchema,
  updateStudentAnswersSchema,
  studentIdParamSchema,
  studentPinParamSchema,
};
