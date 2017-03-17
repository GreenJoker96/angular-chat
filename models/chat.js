var mongoose = require('mongoose');

let Chat = new mongoose.Schema({
    name: {type: String, required: true, index:true},
    users: [],
    messages: [{}]
});

mongoose.model('Chat', Chat);