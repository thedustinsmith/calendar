var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    secrets = require('../secrets.json');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserialize', id);
    done(null, {
        id: id
    });
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

passport.use(new FacebookStrategy({
    clientID: secrets.facebookAppId,
    clientSecret: secrets.facebookSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
      // if (err) { return done(err); }
      done(null, {
        id: profile.provider + profile.id,
        name: profile.displayName
      });
    // });
  }
));

passport.use(new GoogleStrategy({
    clientID: secrets.googleClientId,
    clientSecret: secrets.googleSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(token, tokenSecret, profile, done) {
    done(null, {
        id: profile.provider + profile.id,
        name: profile.displayName
    });
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
}
));