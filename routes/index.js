var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res){
	res.render('index');
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
router.get('/swiping', function(req, res) {
	res.render('swiping');
});

/* GET admin page.*/
router.get('/admin', function(req, res) {
	res.render('admin');
});	

/* post admin page.*/
router.post('/admin', function(req, res) {
	console.log('admin');

	res.redirect("dashboard");

});

/* GET admin page.*/
router.get('/dashboard', function(req, res) {
	res.render('dashboard');
});	

/*get showTheLove page.*/

router.get('/showthelove',function(req, res){

	res.render('showTheLove');
})

/*get addwork page*/

router.get('/addwork',function(req, res){

	res.render('addwork');
})


module.exports = router;



