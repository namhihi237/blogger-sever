import cors from "cors";
import express from "express";
import path from "path";
import { envVariables } from "../configs";
const { nodeEnv } = envVariables;

const morgan = nodeEnv !== "production" && require("morgan");

export const defaultMiddleware = (app) => {
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(express.json());
    app.use(express.static("public"));
    app.use(express.static(path.join(__dirname, "js")));
    app.use(cors());
    app.get("/home", function (req, res) {
        res.render("home.ejs");
    });
    morgan && app.use(morgan("dev"));
};
