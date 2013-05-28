var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    MemoryStore = express.session.MemoryStore;
    helmet = require('helmet');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(helmet.xframe());
  //app.use(helmet.iexss());
  //app.use(helmet.contentTypeOptions());
  //app.use(helmet.cacheControl());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "notagoodsecret",
    //cookie: {httpOnly: true, secure: true},
    cookie: {httpOnly: true},
  }));
  app.use(express.csrf());

  app.use(function (req, res, next) {
    res.locals.csrftoken = req.session._csrf;
    next();
  });

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.isAuthenticated, routes.index);
app.post('/login', routes.login);
app.post('/getAuth', routes.getAuth);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  //process.setuid(config.uid);
  //process.setgid(config.gid);
});
