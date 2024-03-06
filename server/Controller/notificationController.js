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
            {
                receiver: currentUserId,
                read: false,
                $or: [
                    { action: 'like' },
                    { action: 'comment' }
                ]
            },
            {
                read: true
            }
        );
        res.send({
            success: true,
            data: notification,
            message: "notification has been read"
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.CountNotication = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await Notificaiton.find({ receiver: userId });
        let count = 0;
        notification.forEach(ele => {
            if (ele.read === false && ele.action !== "message") {
                count++;
            }
        })
        // console.log({});
        res.send({
            success: true,
            data: count
        });
    } catch (error) {
        res.send(error.message);
    }
}

exports.CountMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await Notificaiton.find({ receiver: userId });
        let count = 0;
        notification.forEach(ele => {
            if (ele.readMessage === false && ele.action === "message") {
                count++;
            }
        })
        // console.log({});
        res.send({
            success: true,
            data: count
        });
    } catch (error) {
        res.send(error.message);
    }
}
exports.MarkMessageAsRead = async (req, res) => {
    try {
        const userid = req.userId;
        await Notificaiton.updateMany(
            {
                receiver: userid,
                readMessage: false,
                action: 'message'
            },
            {
                readMessage: true
            }
        );
        res.send({
            success: true,
            message: "notification mark as read"
        })
    } catch (error) {
        res.send(error.message);
    }
}