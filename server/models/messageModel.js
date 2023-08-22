const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [{
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]

}, {
    timestamps: true
})
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;