const router = require('express').Router();
const User = require('../models/userModel')
const bycrypt = require('bcryptjs');

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
module.exports = router;
