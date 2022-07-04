import joi from "joi";

const atividadeSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required(),
    cor: joi.string().required()
});

export default atividadeSchema;