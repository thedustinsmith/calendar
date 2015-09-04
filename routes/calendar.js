var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.user) {
		res.redirect('/');
		return;
	}
	res.render('calendar/index', { 
		title: 'Calendar',
		userId: req.user.id
	});
});

module.exports = router;
