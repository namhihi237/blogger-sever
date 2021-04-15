import { verifyToken } from "../utils";
import PostService from "./post.service";

const postService = new PostService();

export const socketService = (io) => {
    io.on("connection", (socket) => {
        console.log("connection");
        const token = socket.handshake.query.token;
        // if (!token || token == "null" || token == "" || token == null || token == undefined) {
        //     console.log("token invalid:", token);
        // } else {
        //     const { _id } = verifyToken(token);
        // socket.userId = id;
        socket.on("send-posts", async (data) => {
            const posts = await postService.posts();
            socket.emit("receive-posts", { posts });
        });
        // }
    });
};
