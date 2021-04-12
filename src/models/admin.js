import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Admin = model("admin", AdminSchema, "admin");
