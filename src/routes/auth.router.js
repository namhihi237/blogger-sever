import { Router } from "express";
import { authController } from "../controllers";
import { authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const authRouter = Router();

authRouter.route("/api/v1/auth/register").post(authController.register);

authRouter.route("/api/v1/auth/login").post(authController.login);
