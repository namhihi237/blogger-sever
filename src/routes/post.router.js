import { Router } from "express";
import { postController } from "../controllers";
import { authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const postRouter = Router();

postRouter.route("/api/v1/posts").post(jwtMidleware, postController.create);

postRouter.route("/api/v1/posts").get(jwtMidleware, postController.getAll);

postRouter.route("/api/v1/posts").put(jwtMidleware, postController.update);

postRouter.route("/api/v1/posts").delete(jwtMidleware, postController.deletePost);
