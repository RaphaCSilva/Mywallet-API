import db from "../db.js";

export async function validaToken(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if(!token) {
        console.log("sem token");
        return res.sendStatus(401);
    }
    try {
        const session = await db.collection("sessions").findOne({token}); 

        if(!session){
         return res.status(401).send("Nenhuma session encontrada");
        }

        const usuario = await db.collection("usuarios").findOne({_id: session.userId});

        if(!usuario) {
            return res.status(401).send("Nenhum usuario encontrado");
        }

        res.locals.usuario = usuario;
        next();
    } catch (e) {
        console.log("Erro tentando encontrar o usuario", e);
        return res.sendStatus(500);
    }
}