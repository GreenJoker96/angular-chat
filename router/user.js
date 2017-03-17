const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    passport = require('passport');

module.exports = (app) => {
    // How many times to hash password
    var saltRounds = 10;

    // Require needed mongoose models
    var User = mongoose.model('User');

    /**
     * Login the user be sending it through the passport middleware
     * then send the user back with a Json web token
     *
     * @param req
     * @param res
     *
     */
    app.post('/userLogin', passport.authenticate('local', {session: false}), (req, res, next) => {
       res.json({user: req.user});
    });

    /**
     * Create a user in mongoose and then hash the users password before saving the user
     * and sending the user back to the app
     *
     * @param req
     * @param res
     *
     */
    app.post('/postUser', (req, res) => {
        user = new User(req.body);
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                user.password = hash;
                user.save();
            });
        });
        res.json({user});
    });
};