const router = require('express').Router();
const Notificaiton = require('../models/noficationModel');
const authMiddleware = require('../middleware/authMiddleware');


//get a notification 
router.post('/getAllNotification', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.currentUserId;
        // console.log(userId, 'notification 10')
        const notification = await Notificaiton.find({ receiver: userId }).populate('sender').sort({ createdAt: -1 });
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
        const currentUserId = req.body.currentUserId;
        const notification = await Notificaiton.updateMany({ receiver: currentUserId, read: false }, { read: true });
        // console.log(notification);
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