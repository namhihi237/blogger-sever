import { HttpError } from "../utils";
import { Viewer, Blogger, Posts } from "../models";

export default class ViewerService {
    async viewer(viewerId) {
        let user = await Viewer.findById({ _id: viewerId });
        return user;
    }

    async viewers() {
        return;
    }
}
