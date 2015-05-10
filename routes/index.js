var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/* GET user profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile');
});


module.exports = router;
