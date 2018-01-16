const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/*
const loggedInOnly = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect("/login");
};

const loggedOutOnly = (req, res, next) => {
	if (req.isUnauthenticated()) next();
	else res.redirect("/");
};
*/

// Register form
router.get('/register', function(req, res, next) {
	res.render('register', {
		user: req.user
	}).catch(next);
});

// router.get('*', (req, res, next) => {
// 	res.locals.user = req.user || null;
// 	next();
// });

router.post('/register', function(req, res, next) {
	User.create(req.body)
		.then((user) => {
			res.send(user)
			res.redirect('/')
		}).catch(next)
});

router.get('/login', (req, res, next) => {
	res.render('login', {
		user: req.user
	}).catch(next);
});

router.post('/login', (req, res, next) => {
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})(req, res, next);
	});

router.get('/logout', (req, res) =>{
	req.logout();
	res.redirect('/');
});

router.get('/forgot', (req, res) => {
	res.render('forgot', {
		user: req.user
	});
});

// router.put('/update', (req, res))

module.exports = router;


