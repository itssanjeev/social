const router = require('express').Router();
const User = require('../models/userModel')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

module.exports = router;
