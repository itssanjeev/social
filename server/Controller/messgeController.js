// const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModels');
const Notification = require('../models/noficationModel');
const User = require('../models/userModel')
const { sendMessageNotification } = require('../socket/socketManager')




exports.CreateNewChat = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.body.receiverId;
        const chatId = senderId + receiverId;
        const message = new Message({
            chatId: chatId,
            receiverId: receiverId,
            userId: senderId
        })
        await message.save();
        res.send({
            data: message,
        })
    } catch (error) {
        res.send(error.message)
    }
}

exports.SentMessage = async (req, res) => {
    const text = req.body.text;
    const chatId = req.body.chatId;
    const receiverId = req.body.receiverId;
    const userid = req.userId;
    // console.log(userid)
    try {
        const newMessage = new Chat({
            chatId: chatId,
            receiverId: receiverId,
            text: text
        })
        await newMessage.save();
        const notification = new Notification({
            sender: userid,
            receiver: receiverId,
            action: 'message',
            chatId: chatId,
            read: false,
            readMessage: false
        })
        await notification.save();
        const user = await User.findById(userid);
        notification.sender = user;
        sendMessageNotification({ receiverId, notification });
        res.send({
            success: true,
            message: "sent successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while saving the notification",
            error: error.message
        });
    }
}
/**
 * @param1 {userId} -[userid of current user]
 * @description1 {} -[]
 * @description2 {} -[]
 * @returntype {userList} -[other userid,chatId,profile_picture,otherUsername]
 */
exports.GetMessageUserList = async (req, res) => {
    try {
        const userId = req.userId;
        let transformedData1, transformedData2;
        // console.log(userId);

        //this is when current user is sender 
        let userListMadeByCurrentUser = await Message.find({ userId: userId }).populate('receiverId');
        transformedData1 = userListMadeByCurrentUser.map(async (message) => {
            const chatId = message.chatId;
            const receiverName = message.receiverId.name;
            const receiverUsername = message.receiverId.username;
            const receiverId = message.receiverId._id;
            const profilePicture = message.receiverId.profilePicture;
            const notificationsCount = await Notification.countDocuments({
                receiver: userId,
                sender: receiverId,
                action: 'message',
                read: false,
            });
            return {
                chatId,
                receiverId,
                receiverName,
                receiverUsername,
                profilePicture,
                notificationsCount,
            }
        })
        //this is when current user is receiver 
        let userListMadeByOtherUser = await Message.find({ receiverId: userId }).populate('userId');
        transformedData2 = userListMadeByOtherUser.map(async (message) => {
            const chatId = message.chatId;
            const receiverName = message.userId.name;
            const receiverUsername = message.userId.username;
            const receiverId = message.userId._id;
            const profilePicture = message.userId.profilePicture;
            const notificationsCount = await Notification.countDocuments({
                receiver: userId,
                sender: receiverId,
                action: 'message',
                read: false,
            });

            return {
                chatId,
                receiverId,
                receiverName,
                receiverUsername,
                profilePicture,
                notificationsCount
            }
        })

        // Resolve promises and concatenate the transformed data
        transformedData1 = await Promise.all(transformedData1);
        transformedData2 = await Promise.all(transformedData2);
        let transformedData = transformedData1.concat(transformedData2);
        // console.log(transformedData);
        res.send({
            data: transformedData || [],
            success: true,
        })
    } catch (error) {
        res.send(error.message);
    }
}
exports.GetMessage = async (req, res) => {
    try {
        const chatId = req.body.chatId;
        const receiverId = req.body.receiverId;
        const chat = await Chat.find({ chatId: chatId });
        const userid = req.userId;


        res.send({
            data: chat,
            message: "chat retrived successfully",
            success: true,
        })
    } catch (error) {
        res.send(error.message);
    }
}

