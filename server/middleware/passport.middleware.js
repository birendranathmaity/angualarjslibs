const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var UserMaster = require('./../datamodel/usermaster.model');

passport.use(new LocalStrategy(function (username, password, done) {

    UserMaster.findOne({ username: username }, function (err, user) {
        console.log('passport::::-err-::::::::::', err, 'passport::::-user-::::::::::', user);
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});