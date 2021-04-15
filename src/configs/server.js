import express from "express";
import http from "http";
import socketIo from "socket.io";
export class HttpServer {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.server = http.Server(this.app);
        this.io = socketIo(this.server, {
            cors: {
                origin: "*",
            },
        });
    }

    getApp() {
        return this.app;
    }
    registerMiddleware(middleware) {
        middleware(this.app);
    }

    registerRouter(router) {
        this.app.use(router);
    }

    socketEventHandler(eventsHandler) {
        eventsHandler(this.io);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log("server is listening on port", this.port);
        });
    }
}
