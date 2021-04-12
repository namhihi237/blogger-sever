import { HttpServer, envVariables, dbConnection } from "./configs";

const { port, mongoURI } = envVariables;
import { defaultMiddleware } from "./middlewares";
import { errorHandle } from "./middlewares";
import { authRouter, postRouter } from "./routes";

import {} from "./utils";
export let server;
const main = async () => {
    server = new HttpServer(port);
    server.registerMiddleware(defaultMiddleware);
    server.listen();

    dbConnection(mongoURI);
    // api
    server.registerRouter(authRouter);
    server.registerRouter(postRouter);

    server.registerMiddleware(errorHandle);
};
main();
