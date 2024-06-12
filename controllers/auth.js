const User = require('../models/user');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

async function getUserIdentification(req, res) {
    res.render('userIdentification', { title: 'User Identification' });
}

async function getLogin(req, res) {
    res.render('login', { title: 'Login' });
}

async function postLogin(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.isAdmin = user.isAdmin || false;
            res.redirect('/homepage');
        } else {
            res.render('login', { title: 'Login', errorMessage: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getSignup(req, res) {
    res.render('signup', { title: 'Sign Up' });
}

async function postSignup(req, res) {
    await check('username').notEmpty().withMessage('Username is required').run(req);
    await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
    await check('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must be the same').run(req);
    await check('email').isEmail().withMessage('Email is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { title: 'Sign Up', errors: errors.array() });
    }

    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.render('signup', { title: 'Sign Up', errors: [{ msg: 'Username already exists' }] });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.render('signup', { title: 'Sign Up', errors: [{ msg: 'Email already being used' }] });
        }

        const user = new User({ username: username, password: hashedPassword, email: email, isAdmin: false });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function googleLogin(req, res) {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.isAdmin = user.isAdmin || false;
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'No account associated with this email' });
        }
    } catch (err) {
        console.error('Error with Google login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUserIdentification,
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    googleLogin
};
