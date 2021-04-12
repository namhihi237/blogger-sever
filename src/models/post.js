import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        bloggerId: {
            type: Schema.Types.ObjectId,
            ref: "blogger",
            required: true,
        },
        nameAuthor: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        like: {
            type: Number,
            default: 0,
        },
        comment: [
            {
                viewerId: {
                    type: Schema.Types.ObjectId,
                    ref: "viewer",
                },
                fullName: {
                    type: String,
                    required: true,
                },
                default: [],
            },
        ],
    },
    { timestamps: true }
);

export const Posts = model("post", PostSchema, "post");
