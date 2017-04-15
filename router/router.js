var sharedInstance = require('../sharedInstance').getInstance();
var api = require('./api');

var router = function (app) {

	app.get('/',function (req,res) {
		res.redirect('/index.html');
	});

	app.use('/api',api);
}


module.exports = router;