const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
        },
        receiverId: {
            type: String,
        },
        text: {
            type: String
        },
        image: {
            type: String,
        },
        video: {
            type: String
        }
    },
    {
        timestamps: true
    }

)
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;