import joi from 'joi';
import db from "../db";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function cadastro(req, res) {
    const infocadastro = req.body;
    const {nome, email, senha} = req.body;
    const cadastroSchema = joi.object({
      nome: joi.string().required(),
      email: joi.string().email().required(),
      senha: joi.string().required(),
      confirma: joi.ref('senha')
    });
    const {error} = cadastroSchema.validate(infocadastro, {abortEarly: false});
    if(error){
      return res.status(422).send(error);
    }
    try {
      const salt = 10;
      await db.collection("usuarios").insertOne({
          nome,
          email,
          senha: bcrypt.hashSync(senha, salt)
      })
      res.sendStatus(201);
    } catch (e) {
      console.log("erro no cadastro", e);
      return res.sendStatus(500);
    }
}

export async function login(req, res) {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        senha: joi.string().required()
    });
    const {error} = loginSchema.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(422).send(error);
    }
    try {
        const usuario = await db.collection("usuarios").findOne({email: req.body.email});
        if(!usuario){
            return res.sendStatus(404);
        }
        if(usuario && bcrypt.compareSync(req.body.senha, usuario.senha)){
            const token  = uuid.v4();
            await db.collection("sessions").insertOne({
                userId: usuario._id,
                token
            })
            return res.send({token, nome: usuario.nome});
        }
        return res.sendStatus(404);
    } catch (e) {
        console.log("erro no login", e);
        return res.sendStatus(500);
    }
}