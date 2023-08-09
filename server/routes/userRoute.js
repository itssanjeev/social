const router = require('express').Router();
const User = require('../models/userModel')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const path = require('path');

router.post('/register', async (req, res) => {
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
})

//user login 
router.post('/login', async (req, res) => {
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
        const token = jwt.sign({ userid: user._id }, process.env.SECRET_TOKEN, { expiresIn: "30d" });

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
})

//get current user 
router.get("/get-current-user", authMiddleware, async (req, res) => {
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
})

//get image form pc to local storage 
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploadImage'),
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
})

//edit user profile 
router.post("/edit-user-profile", authMiddleware, multer({ storage: storage }).single("file"), async (req, res) => {
    try {
        // console.log('userRoute', req.userId);
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
        res.send({
            success: true,
            message: "profile updated!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

})

module.exports = router;
