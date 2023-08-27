const router = require('express').Router();
const mongoose = require('mongoose');
const Notificaiton = require('../models/noficationModel');
const postSchema = require('../models/postModel');
const authMiddleware = require('../middleware/authMiddleware');

//get a notification 
router.post('/getAllNotification', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.currentUserId;
        const notification = await Notificaiton.find({ user: userId });
        res.send({
            success: true,
            message: "notication got successfully",
            data: notification
        })
    } catch (error) {
        res.send(error.message);
    }
})

//read the notification 
router.post('/markNotificationAsRead', authMiddleware, async (req, res) => {
    try {
        const notificationId = req.body.notificationId;
        const notification = await Notificaiton.findByIdAndUpdate(notificationId, { read: true });
        res.send({
            success: true,
            data: notification,
            message: "notification has been read"
        })
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;