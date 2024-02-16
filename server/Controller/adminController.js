const Post = require('../models/postModel');

exports.ApprovePost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const post = await Post.findById(postId);
        post.status = "approve",
            await post.save();
        res.send({
            success: true,
            message: "approved",
            data: post
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.BlockPost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const post = await Post.findById(postId);
        post.status = "block",
            await post.save();
        res.send({
            success: true,
            message: "blocked",
            data: post
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.GetAllPostAdmin = async (req, res) => {
    try {
        const pageNo = 1;
        const postLimit = 5;
        const posts = await Post.find().populate('user').populate('likes').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).sort({ createdAt: 'desc' });
        res.json({
            data: posts,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}