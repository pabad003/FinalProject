const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
const authHandler = require('./controllers/auth.js');
const messageHandler = require('./controllers/message.js');

const app = express();
const port = 3000;

const mongoURL = 'mongodb://localhost:27017/chatroom';
mongoose.connect(mongoURL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', authHandler.getUserIdentification);
app.get('/login', authHandler.getLogin);
app.post('/login', authHandler.postLogin);
app.get('/signup', authHandler.getSignup);
app.post('/signup', authHandler.postSignup);
app.post('/auth/google-login', authHandler.googleLogin);  
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.get('/homepage', homeHandler.getHome);
app.post('/create', homeHandler.createRoom);
app.delete('/room/:roomId', homeHandler.deleteRoom);
app.get('/:roomId', roomHandler.getRoom);
app.get('/:roomId/messages', roomHandler.getMessages);
app.post('/:roomId/messages', roomHandler.postMessage);
app.put('/:roomId/messages/:messageId', messageHandler.editMessage);
app.delete('/:roomId/messages/:messageId', messageHandler.deleteMessage);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
