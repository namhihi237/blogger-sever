import { HttpError } from "../utils";

const create = async (req, res, next) => {
    const {} = req.body;
    try {
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
