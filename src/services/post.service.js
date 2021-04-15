import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";

import ViewerService from "./viewer.service";
const viewerService = new ViewerService();
export default class PostService {
    // get one
    async post(conditions) {
        return Posts.findOne(conditions);
    }

    // get all
    async posts(conditions) {
        return Posts.find(conditions, { __v: 0, createdAt: 0, updatedAt: 0 });
    }

    async create(data) {
        return Posts.create(data);
    }

    async update(postId, data) {
        if (!(await this.post({ _id: postId }))) return false;
        return Posts.findByIdAndUpdate({ _id: postId }, data);
    }

    async deletePost(postId) {
        if (!(await this.post({ _id: postId }))) return false;
        return Posts.findByIdAndDelete({ _id: postId });
    }

    async likeAndUnlike(userId, postId) {
        const blogger = await bloggerService.blogger(userId);
        const viewer = await viewerService.viewer(userId);
        if (!blogger && !viewer) return false;
        const user = blogger || viewer;
        const post = await this.post({ _id: postId });
        if (!post) return false;
        let likes = post.likes;

        //unlike
        for (let like in likes) {
            if (like.userId === userId) {
                likes = likes.filter((e) => e.userId === userId);
                await Posts.findByIdAndUpdate({ _id: postId }, { likes });
                return true;
            }
        }
        //like
        like.push({ userId, fullName: user.fullName });
        await Posts.findByIdAndUpdate({ _id: postId }, { likes });
        return true;
    }

    async comment(userId, postId, content) {
        const blogger = await bloggerService.blogger(userId);
        const viewer = await viewerService.viewer(userId);
        if (!blogger && !viewer) return false;
        const user = blogger || viewer;
        const post = await this.post({ _id: postId });
        if (!post) return false;

        await Posts.findByIdAndUpdate(
            { _id: postId },
            { $push: { comments: { userId, fullName: user.fullName, content } } }
        );
    }
}
