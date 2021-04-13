import { Router } from "express";
import { postController } from "../controllers";
import { authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const postRouter = Router();

postRouter.route("/api/v1/posts").post(postController.create);

postRouter.route("/api/v1/posts").get(postController.getAll);

postRouter.route("/api/v1/posts").put(postController.update);

postRouter.route("/api/v1/posts").delete(postController.deletePost);
