const ChatRoom = require('../models/chatRoom');

const badWords = {
    'mierda': 'm****a',
    'joder': 'j****r',
    'shit': 's***',
    'fuck': 'f***',
    'bitch': 'b****',
    'puta': 'p***'
};

function sanitizeMessage(message) {
    let sanitizedMessage = message;
    for (const [badWord, replacement] of Object.entries(badWords)) {
        const regex = new RegExp(`\\b${badWord}\\b`, 'gi');
        sanitizedMessage = sanitizedMessage.replace(regex, replacement);
    }
    return sanitizedMessage;
}

async function getMessages(req, res) {
    const roomId = req.params.roomId;
    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (chatRoom) {
            res.json(chatRoom.messages);
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function postMessage(req, res) {
    const roomId = req.params.roomId;
    const text = req.body.text;

    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!text) {
        return res.status(400).json({ error: 'Message text is required' });
    }

    const sanitizedText = sanitizeMessage(text);

    const message = {
        nickname: req.session.username,
        text: sanitizedText,
        datetime: new Date()
    };

    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (chatRoom) {
            chatRoom.messages.push(message);
            await chatRoom.save();
            res.status(201).json(message);
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (err) {
        console.error('Error posting message:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getRoom(req, res) {
    const roomId = req.params.roomId;
    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (chatRoom) {
            res.render('room', {
                title: 'Chatroom',
                roomName: chatRoom.name,
                roomId: roomId,
                user: req.session.username,
                isAdmin: req.session.isAdmin
            });
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (err) {
        console.error('Error fetching chat room:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function editMessage(req, res) {
    const roomId = req.params.roomId;
    const messageId = req.params.messageId;
    const newText = req.body.text;

    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!newText) {
        return res.status(400).json({ error: 'Message text is required' });
    }

    const sanitizedText = sanitizeMessage(newText);

    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (chatRoom) {
            const message = chatRoom.messages.id(messageId);
            if (message && (message.nickname === req.session.username || req.session.isAdmin)) {
                message.text = sanitizedText;
                await chatRoom.save();
                res.status(200).json(message);
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (err) {
        console.error('Error editing message:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteMessage(req, res) {
    const roomId = req.params.roomId;
    const messageId = req.params.messageId;

    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const chatRoom = await ChatRoom.findOne({ id: roomId });
        if (chatRoom) {
            const message = chatRoom.messages.id(messageId);
            if (message && (message.nickname === req.session.username || req.session.isAdmin)) {
                message.remove();
                await chatRoom.save();
                res.status(200).json({ message: 'Message deleted successfully' });
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getRoom,
    getMessages,
    postMessage,
    editMessage,
    deleteMessage
};
