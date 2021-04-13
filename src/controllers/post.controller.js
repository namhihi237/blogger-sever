import { HttpError } from "../utils";
import { PostService, BloggerService } from "../services";

const postService = new PostService();
const bloggerService = new BloggerService();

const create = async (req, res, next) => {
    // const { _id } = req.user;
    const _id = "607464b985d35d00e001d484";
    const { title, content } = req.body;
    console.log(req.body);
    try {
        if (!title || !content) throw new HttpError("data is empty", 400);
        const user = await bloggerService.blogger(_id);
        if (!user) throw new HttpError("user not found", 404);
        await postService.create({
            title,
            content,
            bloggerId: user._id,
            nameAuthor: user.fullName,
        });

        res.status(200).json({
            status: 200,
            msg: "Created post success",
        });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const posts = await postService.posts();
        res.status(200).json({
            status: 200,
            msg: "Success",
            posts,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    try {
        if (!title || !content) throw new HttpError("data is empty", 400);
        if (!(await postService.update(postId, { title, content })))
            throw new HttpError("Post not found", 404);
        res.status(200).json({
            status: 200,
            msg: "Updated post success",
        });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        if (!(await postService.deletePost(postId))) throw new HttpError("Post not found", 404);
        res.status(200).json({
            status: 200,
            msg: "Deleted post success",
        });
    } catch (error) {
        next(error);
    }
};

export const postController = {
    create,
    getAll,
    update,
    deletePost,
};
