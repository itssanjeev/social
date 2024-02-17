const mongoose = require('mongoose');
// const User = require('./userModel');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending'
    }
},
    {
        timestamps: true
    }
)
// console.log('going to enter in pre');

// postSchema.post('save', async function (doc, next) {
//     console.log('notification model called before post modified', doc._id);
//     const originalPost = await Post.findById(doc._id).lean();
//     if (this.isModified('likes') && this.likes.length > originalPost.likes.length) {
//         console.log('inside isModeified likes');
//         const userWhoLikes = this.likes[this.likes.length - 1];
//         try {
//             const notification = new Notification({
//                 user: userWhoLikes,
//                 action: 'like',
//                 post: this._id,
//             });
//             await notification.save();
//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
//     next();
// })

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
