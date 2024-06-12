
module.exports.roomIdGenerator = function generateRoomIdentifier() {
    // we're intentionally excluding 0, O, I, and 1 for readability
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let result = '';
    for (let i = 0; i < 6; i++)
        result += chars[(Math.floor(Math.random() * chars.length))];

    return result;
};
