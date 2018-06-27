const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register form
router.get('/register', function(req, res, next) {
	res.render('register', {
		user: req.user
	}).catch(next);
});

router.post('/register', function(req, res) {
	const { name, email, username, password } = req.body;
	console.log(req.body);

	const user = new User({
		name,
		email,
		username,
		password
	});

	console.log(user);

	user.save()
		.then(user => {
				res.send(user)
		})
		.catch(err => res.send( err));

});

router.get('/login',  (req, res, next) => {
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

router.get('/logout', (req, res) => {
	console.log('Logging out');
	req.logout();
	res.redirect('/');
});

router.get('/forgot', (req, res) => {
	res.render('forgot', {
		user: req.user
	});
});

module.exports = router;


