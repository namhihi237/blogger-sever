import cors from "cors";
import express from "express";

import { envVariables } from "../configs";
const { nodeEnv } = envVariables;

const morgan = nodeEnv !== "production" && require("morgan");

export const defaultMiddleware = (app) => {
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use(express.json());

    app.use(cors());
    morgan && app.use(morgan("dev"));
};
