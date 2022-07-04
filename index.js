import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db.js';
import chalk from 'chalk';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());



const porta = process.env.PORT || 5000;
app.listen(porta, ()=> {
    console.log(chalk.bold.blue('servidor de pé na porta ' + porta));
});