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

// /* GET login page. */
// router.get('/login', function(req, res) {
// 	res.render('login');
// });

/* login page */
router.route('/login')
  .get(function(req, res, next) {
    res.render('login');
  })
  .post(passport.authenticate('local'), function(req, res) {
    res.send('testing passport post');
  })

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup');
});

/* GET swiping page. */
router.get('/letsdate', function(req, res) {
  var companyName = req.session.companyName;
	res.render('letsdate', {companyName: companyName});
});

module.exports = router;



