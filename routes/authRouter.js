import {Router} from "express";
import { cadastro, login } from "../controllers/authController.js";
import { validateCadastro, validateLogin } from "../middlewares/validateAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/cadastro", validateCadastro, cadastro);
  
authRouter.post("/login", validateLogin, login);
  
export default authRouter;