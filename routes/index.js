var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET landing page. */
router.route('/')  
  .get(function(req, res, next) {
    res.render('index');
  })
  .post(function(req, res, next) {
    req.session.companyName = req.body.companyName;
    res.redirect('letsdate');
  });

router.post('/', function(req, res) {
  console.log('test');
});

/* GET login page. */
router.get('/login', function(req, res) {
	res.render('login', {message: req.flash('message')});
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/addwork',
  failureRedirect: '/login',
  failureFlash : true  
}));

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup');
});

/* GET letsdate page. */
router.get('/letsdate', function(req, res) {
  var companyName = req.session.companyName;
	res.render('letsdate', {companyName: companyName});
});

/* GET addwork page */
router.get('/addwork', function(req, res, next) {
  res.render('addwork', {user: req.user})
});

/* Handle Logout */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;



