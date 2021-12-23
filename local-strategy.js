const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


exports.localstrategy = new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) {
                return done(err);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        });
        return done(null, user);
    });
});