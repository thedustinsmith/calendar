var express = require('express'),
 	router = express.Router(),
 	passport = require('passport');

router.post('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { 
	successRedirect: '/calendar',
	failureRedirect: '/login?failed=true' 
}));

router.post('/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
router.get('/google/callback',
  passport.authenticate('google', { successRedirect: '/calendar',
                                    failureRedirect: '/login?failed=true' }));
module.exports = router;
