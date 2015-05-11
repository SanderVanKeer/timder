var express = require('express');
var router = express.Router();

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
	res.render('login');
});

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



