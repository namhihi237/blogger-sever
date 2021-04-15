import { HttpError } from "../utils";
import { PostService, BloggerService, ViewerService } from "../services";

const postService = new PostService();
const bloggerService = new BloggerService();
const viewerService = new ViewerService();

const create = async (req, res, next) => {
    const { _id } = req.user;
    const { title, content } = req.body;
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
        console.log(error);
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

const getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await postService.post({ _id: postId });
        res.status(200).json({
            status: 200,
            msg: "Success",
            post,
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

const getPostByBlogger = async (req, res, next) => {
    const { _id } = req.user;

    try {
        const posts = await postService.posts({ bloggerId: _id });
        res.status(200).json({
            status: 200,
            msg: "Success",
            posts,
        });
    } catch (error) {
        next(error);
    }
};

const likePost = async (req, res, next) => {
    const { _id } = req.user;
    const { postId } = req.params;
    try {
        await postService.likeAndUnlike(_id, postId);

        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

const commentPost = async (req, res, next) => {
    const { _id } = req.user;
    const { postId } = req.params;
    const { content } = req.body;
    try {
        if (!content) {
            throw new HttpError("comment is empty", 400);
        }
        await postService.comment(_id, postId, content);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const postController = {
    create,
    getAll,
    update,
    deletePost,
    getPostByBlogger,
    getPost,
    likePost,
    commentPost,
};
