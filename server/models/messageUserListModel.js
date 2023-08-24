const mongoose = require('mongoose');

const messageUserListSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    receiver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }]
}, {
    timestamps: true,
})

const MessageUserList = mongoose.model("MessageUserList", messageUserListSchema);
module.exports = MessageUserList;