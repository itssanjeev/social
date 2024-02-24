const router = require('express').Router();
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModels');




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
    try {
        const newMessage = new Chat({
            chatId: chatId,
            receiverId: receiverId,
            text: text
        })
        await newMessage.save();
        res.send({
            success: true,
            message: "sent successfully"
        });
    } catch (error) {
        res.send(error.message);
    }
}

exports.GetMessageUserList = async (req, res) => {
    try {
        const userId = req.userId;
        let transformedData;
        // console.log(userId);
        let userList = await Message.find({ userId: userId }).populate('receiverId');
        if (userList.length > 0) {
            transformedData = userList.map((message) => {
                const chatId = message.chatId;
                const receiverName = message.receiverId.name;
                const receiverUsername = message.receiverId.username;
                const receiverId = message.receiverId._id;
                const profilePicture = message.receiverId.profilePicture;
                return {
                    chatId,
                    receiverId,
                    receiverName,
                    receiverUsername,
                    profilePicture
                }
            })
        } else {
            // console.log('!user')
            userList = await Message.find({ receiverId: userId }).populate('userId');
            transformedData = userList.map((message) => {
                const chatId = message.chatId;
                const receiverName = message.userId.name;
                const receiverUsername = message.userId.username;
                const receiverId = message.userId._id;
                const profilePicture = message.userId.profilePicture;
                return {
                    chatId,
                    receiverId,
                    receiverName,
                    receiverUsername,
                    profilePicture
                }
            })
        }
        // console.log(userList);

        res.send({
            data: transformedData,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}
exports.GetMessage = async (req, res) => {
    try {
        const chatId = req.body.chatId;
        const chat = await Chat.find({ chatId: chatId });
        res.send({
            data: chat,
            message: "chat retrived successfully",
            success: true,
        })
    } catch (error) {
        res.send(error.message);
    }
}

