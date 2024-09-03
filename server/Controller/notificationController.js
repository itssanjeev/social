const Notificaiton = require('../models/noficationModel');

exports.GetNotificationRoute = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId);
        const notification = await Notificaiton.find({
            receiver: userId,
            $or: [
                { action: 'like' },
                { action: 'comment' },
                { action: 'message' }
            ]
        }).populate('sender').sort({ createdAt: -1 });
        // console.log(notification);
        res.send({
            success: true,
            message: "notication got successfully",
            data: notification || []
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.MarkReadNofication = async (req, res) => {
    try {
        const currentUserId = req.body.currentUserId;
        console.log(currentUserId);
        const notification = await Notificaiton.updateMany(
            {
                receiver: currentUserId,
                read: false,
            },
            {
                read: true
            }
        );
        console.log(notification);
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
            if (ele.read === false) {
                count++;
            }
        })
        console.log(count);
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
        res.status(500).send(error.message);
    }
}

exports.readNotificationOFMessageFromSocket = async (req, res) => {
    try {
        // const userid = req.userId;
        const { receiverId, userid } = req.body;
        // console.log('hi');
        await Notificaiton.updateMany(
            {
                receiver: userid,
                sender: receiverId,
                read: false,
                action: 'message'
            },
            {
                read: true
            }
        );
        // console.log(data);
        res.send("message read successfully");
    } catch (error) {
        // console.log(error.message);
        res.status(500).send(error.message);
    }
}