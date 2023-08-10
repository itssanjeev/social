const mongoose = require('mongoose');
const User = require('./userModel');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {
        timestamps: true
    }
)
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
