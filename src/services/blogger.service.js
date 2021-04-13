import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";

export default class BloggerService {
    async blogger(bloggerd) {
        return Blogger.findById({ _id: bloggerd });
    }
}
