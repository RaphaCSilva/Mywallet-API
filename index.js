import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db.js';
import chalk from 'chalk';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.post("/cadastro", async (req, res) => {
  const infocadastro = req.body;
  const {nome, email, senha} = req.body;
  const cadastroSchema = joi.object({
    nome: joi.string().required(),
    email: joi.email().required(),
    senha: joi.string().required(),
    confirmasenha: joi.ref('senha')
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
});

const porta = process.env.PORT || 5000;
app.listen(porta, ()=> {
    console.log(chalk.bold.blue('servidor de pé na porta ' + porta));
});