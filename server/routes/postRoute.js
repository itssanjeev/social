const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel')
const Post = require('../models/postModel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');


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
        // console.log(result.secure_url);
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
        // const posts = await Post.find().populate('user', 'userName').select('content', 'title');
        const posts = await Post.find().populate('user');
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

module.exports = router;
