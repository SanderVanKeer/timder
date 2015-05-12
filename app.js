var express       = require('express'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash         = require('connect-flash'),
    multer        = require('multer'),
    done          = false;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

/**
 * ============
 *   Database
 * ============
 */

// dependencies
var mongoose = require('mongoose');

// connect
mongoose.connect('mongodb://localhost/timder');

// loading models
var Company = require('./models/company.js');
var Student = require('./models/student.js');

/**
 * ===========
 *   Session
 * ===========
 */

// initializing session
app.use(session({
  secret: 'weareimdanditsawesome',
  resave: true,
  saveUninitialized: true
}));

/**
 * ============
 *   Passport
 * ============
 */

// initializing passport
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport/init');
initPassport(passport);

// routes
var routes = require('./routes/index')(passport);
app.use('/', routes);

/**
 * ==========
 *   Multer
 * ==========
 */

// configuring multer
app.use(multer({ dest: 'public/images/uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

// Multer route
app.get('/',function(req,res){
  res.sendfile("addwork.jade");
});

app.post('/index',function(req,res){
  if(done==true){
    console.log(req.files);
    res.render("index.jade");
  }
});

// ============================== EXPRESS CODE ==============================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
