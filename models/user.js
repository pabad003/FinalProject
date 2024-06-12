const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;
