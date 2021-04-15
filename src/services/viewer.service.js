import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";

export default class ViewerService {
    async viewer(bloggeId) {
        let user = await Viewer.findById({ _id: bloggeId });
        return user;
    }
}
