const Notificaiton = require('../models/noficationModel');

exports.GetNotificationRoute = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await Notificaiton.find({ receiver: userId }).populate('sender').sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "notication got successfully",
            data: notification
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.MarkReadNofication = async (req, res) => {
    try {
        const currentUserId = req.body.currentUserId;
        const notification = await Notificaiton.updateMany(
            { receiver: currentUserId, read: false },
            { read: true });
        res.send({
            success: true,
            data: notification,
            message: "notification has been read"
        })
    } catch (error) {
        res.send(error.message);
    }
}
