import joi from "joi";

export const authCadastroSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    confirma: joi.ref('senha')
  });

export const authLoginSchema =  joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
});