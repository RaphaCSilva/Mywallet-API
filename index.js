import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';
import authRouter from './routes/authRouter.js';
import atividadesRouter from './routes/atividadesRouter.js';



dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);
app.use(atividadesRouter);

const porta = process.env.PORT || 5000;
app.listen(porta, ()=> {
    console.log(chalk.bold.blue('servidor de pé na porta ' + porta));
});