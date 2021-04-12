require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 5000,
    mongoURI:
        process.env.DB_URI ||
        "mongodb+srv://cnpm:cnpm17t1@cluster0.n1nom.mongodb.net/blogger?retryWrites=true&w=majority",
    jwtSecret: process.env.JWT_SECRET || "doancnpm!@#",
    nodeEnv: process.env.NODE_ENV || "development",
};
