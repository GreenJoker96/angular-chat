const express = require('express'),
    app = express(),
    http=require('http').Server(app),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    // Require all module files
    mongo = require('./modules/db'),
    routing = require('./modules/routing'),
    passportMiddleware = require('./modules/passport')
    io = require('socket.io')(http);
    mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Require all mongoose models
var models = __dirname + '/models/';
mongo.start(models);

var Chat = mongoose.model('Chat');

app.get('/getMessages', (req, res) => {
    Chat.findOne({'name' : 'chat'}, (err, chat) => {
        res.json({chat});
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (message) => {
        console.log(message);
        Chat.findOne({'name': 'chat'}, (err, chat) => {
        chat.messages.push(message);
        chat.save();
        io.emit('chat message', message);
        });
    });
    socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
});
// Initialize and set up passport
app.use(passport.initialize());
passport.use(passportMiddleware.setup());

// Require all routing files
var routesPath = __dirname + '/router/';
routing.build(routesPath, app);

// Start the server
http.listen(process.env.PORT, function () {
    console.log(`Started at http://localhost:${process.env.PORT}`);
});