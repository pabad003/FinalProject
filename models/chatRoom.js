const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    nickname: String,
    text: String,
    datetime: Date
});

const chatRoomSchema = new mongoose.Schema({
    name: String,
    id: String,
    messages: [messageSchema]
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
