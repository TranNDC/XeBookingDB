const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


var userController = require('./controllers/users');
passport.use(
    new GoogleStrategy({
        clientID: '620132546669-0aodvq102d418k8uehkhuut6g5dlb5ma.apps.googleusercontent.com',
        clientSecret: 'hRI5HAXoxQ3toyUUOl9gGMvb',
        callbackURL: '/auth/google/callback'
    }, function (accessToken, refreshToken, profile, cb) {
        userController.findOrCreate(profile, function (user) {

            cb(null, user);
        });
    })
);

passport.use(new FacebookStrategy({
        clientID: "201698827414594",
        clientSecret: "884ead5b05b881d96b69799e97d108a9",
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.photos[0].value = "https://graph.facebook.com/" + profile.id + "/picture" + "?width=500&height=500" + "&access_token=" + accessToken;
        userController.findOrCreate(profile, function (user) {
            cb(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



module.exports = passport;