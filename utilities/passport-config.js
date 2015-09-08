var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    secrets = require('../secrets.json'),
    db = require('../models/');

function generateProviderHash(profile) {
  return profile.provider + profile.id;
}

function findOrCreate (profile, done) {
    var hash = generateProviderHash(profile);
    db.Users.where({ ProviderHash: hash }).fetch().done(function (user) {
        if (!user) {
          db.Users.forge({
            FirstName: profile.name.givenName || '',
            LastName: profile.name.familyName || '',
            ProviderHash: hash,
            Email: 'thedustinsmith@gmail.com'
          }).save().done(done);
        }
        else {
          done(user);
        }
    });
}

passport.serializeUser(function(user, done) {
    done(null, user.get('UserID'));
});

passport.deserializeUser(function(id, done) {
    db.Users.where({UserID: id}).fetch().done(function(user) {
      done(null, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: secrets.facebookAppId,
    clientSecret: secrets.facebookSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    findOrCreate(profile, function (user) {
      done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: secrets.googleClientId,
    clientSecret: secrets.googleSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function (token, tokenSecret, profile, done) {
    findOrCreate(profile, function (user) {
        done(null, user);
    });
}));