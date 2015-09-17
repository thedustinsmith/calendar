var express = require('express');
var router = express.Router();

router.get('/edit', function (req, res, next) {
	res.render('event/edit', { 
		title: 'Calendar',
		userId: req.user.id
	});
});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
