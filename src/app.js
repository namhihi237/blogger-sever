import { HttpServer, envVariables, dbConnection } from "./configs";

const { port, mongoURI } = envVariables;

import { defaultMiddleware } from "./middlewares";
import { errorHandle } from "./middlewares";
import { authRouter, postRouter, adminRouter } from "./routes";
import { socketService } from "./services";
import { initAccountAmin } from "./utils";

export let server;
const main = async () => {
    server = new HttpServer(port);
    server.registerMiddleware(defaultMiddleware);
    server.listen();

    dbConnection(mongoURI);
    await initAccountAmin();
    // api
    server.registerRouter(adminRouter);
    server.registerRouter(authRouter);
    server.registerRouter(postRouter);

    // handle error
    server.registerMiddleware(errorHandle);
    server.socketEventHandler(socketService);
};
main();
