var express = require('express');
var router = express.Router();

// var isAuthenticated = function (req, res, next) {
//   // if user is authenticated in the session, call the next() to call the next request handler 
//   // Passport adds this method to request object. A middleware is allowed to add properties to
//   // request and response objects
//   if (req.isAuthenticated()) 
//   {
//     return next();
//   }
//   else
//   {
//     console.log('======== user not authenticated ========')
//     res.redirect('/login');
//   }
  // if the user is not authenticated then redirect him to the login page
  
// }


module.exports = function(passport){
  /* GET landing page. */ 
  router.get('/', function(req, res, next) {
    res.render('index');
  });

  /* POST landing page. */
  router.post('/', function(req, res) {
    req.session.companyName = req.body.companyName;
    res.redirect('letsdate');
  });

  /* GET login page. */
  router.get('/login', function(req, res) {
    res.render('login', {message: req.flash('message')});
  });

  /* POST login page */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/addwork',
    failureRedirect: '/login',
    failureFlash : true  
  }));

  /* GET signup page. */
  router.get('/signup', function(req, res) {
    res.render('signup');
  });

  /* POST signup page. */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/addwork',
    failureRedirect: '/signup',
    failureFlash : true  
  }));

  /* GET letsdate page. */
  router.get('/letsdate', function(req, res) {
    var companyName = req.session.companyName;
    res.render('letsdate', {companyName: companyName});
  });

  /* GET addwork page */
  router.get('/addwork', /*isAuthenticated,*/ function(req, res) {
    res.render('addwork', {user: req.user})
  });

  /* GET dasboard page. */
  router.get('/admin', function(req, res){
    res.render('admin');
  });

  /* POST admin page. */
  router.post('/admin', function(req, res) {
    res.redirect('dashboard');
  });

  /* GET dasboard page. */
  router.get('/dashboard', /*isAuthenticated,*/ function(req, res){
    res.render('dashboard');
  });

  /* GET showthelove page. */
  router.get('/showthelove', function(req, res) {
    res.render('showthelove');
  })

  /* Handle Logout */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}



