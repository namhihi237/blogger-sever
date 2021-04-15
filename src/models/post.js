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
        likes: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                fullName: {
                    type: String,
                    required: true,
                },
                default: [],
            },
        ],

        comments: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                fullName: {
                    type: String,
                    required: true,
                },
                content: {
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
