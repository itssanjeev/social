const router = require('express').Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel')
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Notification = require('../models/noficationModel');
// const socketManager = require('../socket/socketManager');


/**
 * @description 
 * @param1
 * @param2 {category} -[1.sports,2.politics,3.religion,4.general]
 */
// get image form pc to local storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploadImage'),
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage }).single("file");

exports.AddNewPost = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error uploading file'
                });
            }
            const userId = req.userId;
            const category = req.body.category;
            // console.log(userId);
            const file = req.file;
            if (!file) {
                return res.send({
                    success: false,
                    message: 'No file provided'
                });
            }

            const result = await cloudinary.uploader.upload(file.path, {
                folder: "connectMe",
            });

            // Remove the uploaded file from local storage
            fs.unlinkSync(file.path);

            const newPost = new Post({
                title: req.body.postTitle,
                content: result.secure_url,
                user: userId,
                category: category
            });

            const post = await newPost.save();

            // Successfully saved the post, now associate it with the user
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { posts: post._id } },
                { new: true }
            );

            res.send({
                success: true,
                message: "Post updated"
            });
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
};

exports.GetAllPost = async (req, res) => {
    try {
        const pageNo = 1;
        const postLimit = 5;
        const posts = await Post.find().populate('user').populate('likes').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).sort({ createdAt: 'desc' });
        const post = posts.filter((p) => {
            return p.status === "approve"
        })
        res.json({
            data: post,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.GetUserPost = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId)
        const userPost = await Post.find({ user: userId });
        // console.log(userPost);
        res.send({
            success: true,
            data: userPost,
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.GetOtherUserPost = async (req, res) => {
    try {
        const userId = req.body.otherUserId;
        // console.log(userId);
        const userPost = await Post.find({ user: userId });
        // console.log(userPost);
        res.send({
            success: true,
            data: userPost
        })
    } catch (error) {
        res.send(error.message);
    }
}
exports.Likes = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //userId is the current userId who is liking the post 
        const userId = req.body.userId;
        const postId = req.body.postId;
        const beforeLikePost = await Post.findOne({ _id: postId }).session(session);
        const liked = beforeLikePost.likes;
        const postOwner = beforeLikePost.user.toString();
        // console.log(postOwner, 'post like 128');
        const currentUser = await User.find({ _id: userId });

        //if user id present in liked array it return true else false 
        const alreadyLiked = liked.some(like => {
            return like._id.toString() === userId;
        });

        // console.log(alreadyLiked);
        if (!alreadyLiked) {
            await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: userId } },
                { new: true, session }
            )
            await User.findByIdAndUpdate(
                userId,
                { $push: { postsLikedByCurrentUser: postId } },
                { new: true, session }
            )

            //i have to send the notification whose post will be liked so i am stroing user as postowner id
            const notification = new Notification({
                receiver: postOwner,
                sender: userId,
                action: 'like',
                post: postId,
                read: false,
            });
            await notification.save();

        } else {
            await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true, session }
            )
            await User.findByIdAndUpdate(
                userId,
                { $pull: { postsLikedByCurrentUser: postId } },
                { new: true, session }
            )
        }
        const posts = await Post.findById(postId).populate('likes').session(session);
        await session.commitTransaction();
        session.endSession();
        res.send({
            success: true,
            data: posts
        })
    } catch (error) {
        // console.log(error.message);
        await session.abortTransaction();
        session.endSession();

        res.send(error.message);
    }
}

exports.Dislikes = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const beforeLikePost = await Post.findOne({ _id: postId });
        const disliked = beforeLikePost.dislikes;

        //if user id present in liked array it return true else false 
        const alreadyDisLiked = disliked.some(dislikes => {
            return dislikes._id.toString() === userId;
        });
        // console.log(alreadyDisLiked);
        if (!alreadyDisLiked) {
            await Post.findByIdAndUpdate(
                postId,
                { $push: { dislikes: userId } },
                { new: true }
            )

        } else {
            await Post.findByIdAndUpdate(
                postId,
                { $pull: { dislikes: userId } },
                { new: true }
            )
        }
        const posts = await Post.findById(postId).populate('dislikes');
        // console.log(posts);
        res.send({
            success: true,
            data: posts
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.Comment = async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId;
        const userComments = req.body.comment;
        const user = await User.findById(userId);
        const post = await Post.findOne({ _id: postId });
        const postOwner = post.user.toString();

        const newComment = new Comment({
            user: user._id,
            comment: userComments
        })
        const comment = await newComment.save();
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comment: comment._id } },
            { new: true }
        )


        const newdata = await Post.findById(postId).populate({
            path: 'comment',
            populate: {
                path: 'user',
            }
        }).select('comment').sort({ createdAt: -1 }).exec();

        /*---------------------notification part----------------*/
        const notification = new Notification({
            receiver: postOwner,
            sender: userId,
            action: 'comment',
            post: postId,
            read: false,
        });
        await notification.save();
        // const userSocket = socketManager.getUserSocket(postOwner);
        // if (userSocket) {
        //     console.log('Sending notification...');
        //     userSocket.emit('notification', `${user.username} has commented you post ${postId}`);
        // }
        /*--------------------------------------------------------*/
        res.send({
            message: "commented successfully",
            data: newdata,
            // newdata: newdata
        })

    } catch (error) {
        res.send(error.message);
    }
}

exports.CatgoeryByPost = async (req, res) => {
    try {
        const pageNo = 1;
        const postLimit = 5;
        // console.log(req.body);
        let category = req.body.category;
        // console.log(category);

        const posts = await (category === 4 ? Post.find().populate('user').populate('likes').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).sort({ createdAt: 'desc' })
            : Post.find({
                category: category
            }).populate('user').populate('likes').populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            }).sort({ createdAt: 'desc' }));
        const post = posts.filter((p) => {
            return p.status === "approve"
        })
        res.json({
            data: post,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.GetPostLikeByCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId);
        const post = await User.findById(userId).populate('postsLikedByCurrentUser');
        res.send({
            data: post.postsLikedByCurrentUser,
            success: true,
        })
    } catch (error) {
        res.send(error.message)
    }
}
exports.VisitPostById = async (req, res) => {
    try {
        const postId = req.query.postId;
        console.log(postId);
        //when using findById it return the object not array 
        const posts = await Post.findById(postId).populate('user').populate('likes').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).sort({ createdAt: 'desc' });
        // console.log(typeof (posts));
        res.json({
            data: posts,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}
