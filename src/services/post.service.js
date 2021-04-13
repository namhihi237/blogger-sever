import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";

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
}
