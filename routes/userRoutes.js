// Rename this file for purposes of logging in users
// Add another routes file for adding profiles

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

const loggedInOnly = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect("/login");
};

const loggedOutOnly = (req, res, next) => {
	if (req.isUnauthenticated()) next();
	else res.redirect("/");
};

// Register form
router.get('/register', (req, res, next) => {
	User.find({})
		.then((user) => {
			res.send(user);
			//res.render('/register')
		}).catch(next);
});

router.get('*', (req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

router.post('/register', (req, res, next) => {
	User.create(req.body)
		.then((user) => {
			res.send(user)
		}).catch(next);
});

router.get('/login', (req, res, next) => {
	res.render('login');
});

router.post(
	'/login', (req, res, next) => {
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})(req, res, next);
	});


module.exports = router;


