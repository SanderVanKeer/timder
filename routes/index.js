var express = require('express');
var router = express.Router();

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
  router.get('/addwork', function(req, res) {
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
  router.get('/dashboard', function(req, res){
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



