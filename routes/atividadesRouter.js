import { Router } from "express";
import { validaToken } from "../middlewares/validateTokenMiddleware.js";
import { getAtividades, postAtividades } from "../controllers/atividadesController.js";

const atividadesRouter = Router();

atividadesRouter.get("/atividades", validaToken, getAtividades);
atividadesRouter.post("/atividades", validaToken, postAtividades);

export default atividadesRouter;