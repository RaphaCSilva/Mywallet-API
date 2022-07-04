import { authLoginSchema, authCadastroSchema } from "../schemas/authSchema.js";

export function validateCadastro(req, res, next) {
    const {error} = authCadastroSchema.validate(req.body);
    if(error){
        return res.sendStatus(422).send(error);
    }

    next();
}

export function validateLogin(req, res, next) {
    const {error} = authLoginSchema.validate(req.body);
    if(error){
        return res.sendStatus(422).send(error);
    }

    next();
}