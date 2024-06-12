const ChatRoom = require('../models/chatRoom');
const User = require('../models/user');
const roomIdGenerator = require('../util/roomIdGenerator');

async function getHome(req, res) {
    try {
        const chatRooms = await ChatRoom.find({}, 'name id');
        const rooms = chatRooms.map(room => ({ name: room.name, id: room.id }));
        const errorMessage = req.query.error;
        let user = null;
        if (req.session.userId) {
            user = await User.findById(req.session.userId);
        }
        res.render('home', { title: 'Home', rooms, errorMessage, user: user ? user.username : null, isAdmin: req.session.isAdmin });
    } catch (err) {
        console.error('Error fetching chat rooms:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createRoom(req, res) {
    const roomName = req.body.roomName;

    if (!roomName) {
        return res.redirect('/homepage?error=Room%20name%20is%20required.');
    }

    try {
        let chatRoom = await ChatRoom.findOne({ name: roomName });
        if (chatRoom) {
            res.redirect('/homepage?error=Room%20already%20exists.%20Please%20select%20it%20from%20the%20list.');
        } else {
            const roomId = roomIdGenerator.roomIdGenerator();
            chatRoom = new ChatRoom({ name: roomName, id: roomId, messages: [] });
            await chatRoom.save();
            res.redirect(`/${roomId}`);
        }
    } catch (err) {
        console.error('Error creating chat room:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteRoom(req, res) {
    const roomId = req.params.roomId;

    if (!req.session.userId || !req.session.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const chatRoom = await ChatRoom.findOneAndDelete({ id: roomId });
        if (chatRoom) {
            res.status(200).json({ message: 'Chat room deleted successfully' });
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (err) {
        console.error('Error deleting chat room:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getHome,
    createRoom,
    deleteRoom
};
