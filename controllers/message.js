const ChatRoom = require('../models/chatRoom');

async function editMessage(req, res) {
    const { roomId, messageId } = req.params;
    const { text } = req.body;

    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (!chatRoom) {
            return res.status(404).json({ error: 'Chat room not found' });
        }

        const message = chatRoom.messages.id(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (message.nickname !== req.session.username && !req.session.isAdmin) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        message.text = text;
        await chatRoom.save();
        res.json(message);
    } catch (err) {
        console.error('Error editing message:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteMessage(req, res) {
    const { roomId, messageId } = req.params;

    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (!chatRoom) {
            return res.status(404).json({ error: 'Chat room not found' });
        }

        const message = chatRoom.messages.id(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        chatRoom.messages.pull({ _id: messageId });  
        await chatRoom.save(); 
        res.json({ message: 'Message deleted' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    editMessage,
    deleteMessage
};
