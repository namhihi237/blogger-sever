import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";
const create = async (req, res, next) => {
    const { _id } = req.user;
    const { title, content } = req.body;
    try {
        if (!title || !content) throw new HttpError("data is empty", 400);
        const user = await Blogger.findById({ _id });
        if (!user) throw new HttpError("user not found", 404);
        await Posts.create({ title, content, bloggerId: user._id, nameAuthor: user.fullName });
        res.status();
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
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
