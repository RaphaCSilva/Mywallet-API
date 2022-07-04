import {Router} from "express";
import { cadastro, login } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/cadastro", cadastro);
  
authRouter.post("/login", login);
  
export default authRouter;