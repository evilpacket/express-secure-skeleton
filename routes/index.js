
/*
 * GET home page.
 */
 var user = require('./user');

exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res) {
  res.render('login', { title: 'Express' });
};

exports.isAuthenticated = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		//next(new Error(401));
		res.render('login', { title: 'Express' });
	}
};

//POST request would come to this from the login page/form
exports.getAuth = function(req, res){
	user.getAuthenticated(req.param('username'), req.param('password'), function(err, user, reason){
		if (user !== null) {
			req.session.user = user;
			res.redirect('/');
		}
		else {
			res.redirect('/login');
			/*console.log('user: '+user);
			console.log('error: '+err);
			console.log('reason: '+reason);*/
		}
	});
};