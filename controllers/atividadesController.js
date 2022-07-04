import db from "../db.js";
import dayjs from "dayjs";
import atividadeSchema from "../schemas/atividadeschema.js";

export async function getAtividades(req, res) {
    const {usuario} = res.locals;
    try {
        const atividades = await db.collection("atividades").find({userId: usuario._id}).toArray();
        res.send(atividades);
    } catch (error) {
        console.log("erro ao pegar as atividades", error);
        return res.sendStatus(500);
    }
}
export async function postAtividades(req, res) {
    const { error } = atividadeSchema.validate(req.body);
    if(error){
        return res.sendStatus(422);
    }
    const {usuario} = res.locals;
    try {
        const {valor, descricao, cor} = req.body;
        await db.collection("atividades").insertOne({
            cor,
            valor,
            descricao,
            data: dayjs().format('DD/MM'),
            userId: usuario._id
        });
        res.sendStatus(201);

    } catch (error) {
        console.log("Erro ao adicionar nova atividade", error);
        return res.sendStatus(500);
    }
}
