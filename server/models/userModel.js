const mongoose = require('mongoose');
// const Post = require('./postModel');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
        },
        profilePicture: {
            type: String,
            default: ""
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        bio: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("User", userSchema);
module.exports = User;