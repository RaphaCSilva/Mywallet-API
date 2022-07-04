import joi from 'joi';
import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function cadastro(req, res) {
    try {
      const salt = 10;
      await db.collection("usuarios").insertOne({
          nome: req.body.nome,
          email: req.body.email,
          senha: bcrypt.hashSync(req.body.senha, salt)
      })
      res.sendStatus(201);
    } catch (e) {
      console.log("erro no cadastro", e);
      return res.sendStatus(500);
    }
}

export async function login(req, res) {
    try {
        const usuario = await db.collection("usuarios").findOne({email: req.body.email});
        if(!usuario){
            return res.sendStatus(404);
        }
        if(usuario && bcrypt.compareSync(req.body.senha, usuario.senha)){
            const token  = uuid();
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