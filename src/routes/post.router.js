import { Router } from "express";
import { postController } from "../controllers";
import { authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const postRouter = Router();

postRouter.route("/api/v1/posts").post(jwtMidleware, postController.create);

postRouter.route("/api/v1/posts/blogger").get(jwtMidleware, postController.getPostByBlogger);

postRouter.route("/api/v1/posts").get(postController.getAll); // no token

postRouter.route("/api/v1/posts/:postId").patch(jwtMidleware, postController.update);

postRouter.route("/api/v1/posts/:postId").delete(jwtMidleware, postController.deletePost);
