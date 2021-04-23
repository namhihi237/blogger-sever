import { HttpError } from "../utils";
import { PostService, BloggerService, ViewerService } from "../services";

const postService = new PostService();
const bloggerService = new BloggerService();
const viewerService = new ViewerService();

const getAll = async (req, res, next) => {
    try {
        const viewers = await viewerService.viewers();
        res.status(200).json({
            status: 200,
            msg: "Success",
            viewers,
        });
    } catch (error) {
        next(error);
    }
};

const deleteViewer = async (req, res, next) => {
    const { viewerId } = req.params;
    try {
        if (!(await postService.deletePost(viewerId))) throw new HttpError("Viewer not found", 404);
        res.status(200).json({
            status: 200,
            msg: "Deleted viewer success",
        });
    } catch (error) {
        next(error);
    }
};

export const postController = {
    getAll,
    deleteViewer,
};
