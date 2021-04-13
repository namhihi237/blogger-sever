import { Router } from "express";
import { postController } from "../controllers";
import { authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const postRouter = Router();

postRouter.route("/api/v1/posts").post(postController.create);

postRouter.route("/api/v1/posts/blogger").post(postController.getPostByBlogger);

postRouter.route("/api/v1/posts").get(postController.getAll); // no token

postRouter.route("/api/v1/posts").patch(postController.update);

postRouter.route("/api/v1/posts").delete(postController.deletePost);
