const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel')
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// get image form pc to local storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploadImage'),
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
})

//add new post
router.post('/addNewPost', authMiddleware, multer({ storage: storage }).single("file"), async (req, res) => {
    try {
        const userId = req.userId;
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
        fs.unlinkSync(file.path); // This deletes the file from the local directory

        const newPost = new Post({
            title: req.body.postTitle,
            content: result.secure_url,
            user: userId
        });


        const post = await newPost.save();

        // Successfully saved the post, now associate it with the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { posts: post._id } }, // Add the new post's ID to the user's "posts" array
            { new: true }
        );
        res.send({
            success: true,
            message: "post Updated"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get all post at once 
router.get('/getAllPost', async (req, res) => {
    try {
        const posts = await Post.find().populate('user').populate('likes').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
        res.json({
            data: posts,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
})

// user Post 
router.get('/getUserPost', authMiddleware, async (req, res) => {
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
})

router.post('/getOtherUserPost', authMiddleware, async (req, res) => {
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
})


router.post('/likes', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const beforeLikePost = await Post.findOne({ _id: postId });
        const liked = beforeLikePost.likes;

        //if user id present in liked array it return true else false 
        const alreadyLiked = liked.some(like => {
            return like._id.toString() === userId;
        });
        console.log(alreadyLiked);
        if (!alreadyLiked) {
            await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: userId } },
                { new: true }
            )
            likeFlag = true;
        } else {
            await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true }
            )
        }
        const posts = await Post.findById(postId).populate('likes');
        res.send({
            success: true,
            data: posts
        })
    } catch (error) {
        res.send(error.message);
    }
})

router.post('/dislikes', authMiddleware, async (req, res) => {
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
})

router.post('/comment', authMiddleware, async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId;
        const userComments = req.body.comment;
        const user = await User.findById(userId);
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
        }).select('comment').exec();
        // console.log(updatedPost);
        // const realComment = await Post.findById(postId).populate('comment');
        res.send({
            message: "commented successfully",
            data: newdata,
            // newdata: newdata
        })

    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;
