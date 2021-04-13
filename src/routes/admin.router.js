import { Router } from "express";
import { adminController } from "../controllers";

export const adminRouter = Router();

adminRouter.route("/api/v1/admin/login").post(adminController.login);
