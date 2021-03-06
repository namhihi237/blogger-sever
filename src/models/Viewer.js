import { Schema, model } from "mongoose";

const ViewerSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            required: true,
            default: 2,
        },
    },
    { timestamps: true }
);

export const Viewer = model("viewer", ViewerSchema, "viewer");
