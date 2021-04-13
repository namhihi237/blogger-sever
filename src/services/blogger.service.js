import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";

export default class BloggerService {
    async blogger(bloggeId) {
        let user = await Blogger.findById({ _id: bloggeId });
        return user;
    }
}
