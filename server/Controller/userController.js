const router = require('express').Router();
const User = require('../models/userModel')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// const socketManager = require('../socket/socketManager');

exports.Register = async (req, res) => {
    try {
        // console.log('register api called');
        const email = await User.findOne({ email: req.body.email })
        const username = await User.findOne({ username: req.body.username })
        if (email) {
            throw new Error('email already is in use');
        } else if (username) {
            throw new Error('user name already exist. please choose new ');
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "Registed successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

exports.Login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        // console.log(user._id);
        if (!user) {
            throw new Error('user is not found');
        }
        const validPassword = bycrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            throw new Error('wrong password');
        }
        const token = jwt.sign({ userid: user._id }, process.env.SECRET_TOKEN);
        // socketManager.getUserSocket(user._id, 'login socket route');
        res.send({
            success: true,
            message: "login successfully",
            data: token  // we are sending jwt token 
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}



exports.GetCurrentUser = async (req, res) => {
    try {
        // console.log("/get-current-user");
        const user = await User.findById(req.userId);
        res.send({
            success: true,
            message: "got current user succesfully",
            data: user,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

// get image form pc to local storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploadImage'),
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage }).single("file");

exports.EditUserProfile = async (req, res) => {
    try {
        // console.log('userRoute', req.userId);
        upload(req, res, async (err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error uploading file'
                });
            }

            const file = req.file;


            // console.log(req.body.name);
            if (req.body.username) {
                const existingUsername = await User.findOne({ username: req.body.username });
                // console.log(req.body);
                if (existingUsername) {
                    throw new Error('user name already exist. please choose new ');
                }
            }

            if (!file) {
                return res.send({
                    success: false,
                    message: 'No file provided'
                });
            }
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "connectMe",
            });
            const updatedData = {};
            updatedData.profilePicture = result.secure_url;
            updatedData.name = req.body.name;
            updatedData.username = req.body.username;
            updatedData.bio = req.body.bio;
            // console.log(updatedData);
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.userId }, // Find user by userId
                { $set: updatedData }, // Update the specified properties
                { new: true } // Return the updated user in the response
            );
            // Remove the uploaded file from local storage
            fs.unlinkSync(file.path);
            res.send({
                success: true,
                message: "profile updated!"
            })
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

}

exports.FollwUser = async (req, res) => {
    try {
        const { userIdToFollow } = req.body
        const userId = req.userId;
        const userToFollow = await User.findById(userIdToFollow);
        if (!userToFollow) {
            throw new Error("user is not found to follow ");
        }
        // console.log(userToFollow);
        const alreadyFollowing = false;
        userToFollow.followers.forEach(user => {
            console.log(user.toString());
            if (userId === user.toString()) {
                alreadyFollowing = true;
            }
        })
        if (alreadyFollowing) {
            throw new Error("alreay following the user");
        }
        //update followers and following both for user 
        await User.findByIdAndUpdate(userId, { $push: { following: userIdToFollow } })
        await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: userId } })
        const user = await User.findById(userId);
        res.send({
            success: true,
            message: "you are following ",
            data: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

exports.GetFollower = async (req, res) => {
    try {
        const userId = req.body.followerId;
        // console.log('getFollowers', userId);
        const userFollowers = await User.findById(userId).populate("followers");
        // console.log(userFollowers)
        res.json({
            success: true,
            data: userFollowers
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}

exports.GetOhterUser = async (req, res) => {
    try {
        const userId = req.body.otherUserId;
        // console.log(userId);
        const user = await User.findById(userId);
        res.json({
            success: true,
            data: user
        })
    } catch (error) {
        res.send(error.message)
    }
}

exports.GetFollowing = async (req, res) => {
    try {
        const userId = req.body.followingId;
        // console.log(userId);
        const userFollowing = await User.findById(userId).populate('following');
        console.log(userFollowing);
        res.json({
            success: true,
            data: userFollowing
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}

exports.SearchUser = async (req, res) => {
    try {
        const text = req.body.text;
        // console.log(text);
        const users = await User.find(
            {
                $or: [
                    { username: { $regex: text, $options: 'i' } },
                    { name: { $regex: text, $options: 'i' } }
                ]
            }
        );
        // console.log(users);
        res.json({
            success: true,
            data: users
        })
    } catch (error) {
        res.send(error.message);
    }
}
/*------------------------------------------------------- */