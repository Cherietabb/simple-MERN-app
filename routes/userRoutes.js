const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
require('../services/passport')(passport);

router.get('/', (req, res, next) => {
	if (req.user) {
		return res.status(200).json({
			user: req.user,
			authenticated: true
		});
	} else {
		return res.status(401).json({
			error: 'User is not authenticated',
			authenticated: false
		});
	}
});

router.post('/register', function (req, res) {
	const {name, email, username, password} = req.body;
	console.log(req.body);

	const user = new User({
		name,
		email,
		username,
		password
	});

	user.save()
		.then(user => {
			res.send({message: 'new user created!'})
		})
		.catch(err => res.send({message: 'Error creating new user', err}));

});

router.get('/login', (req, res, next) => {
	res.render('login', {
		user: req.user
	}).catch(next);
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
		console.log('/login handler', req.body);
		console.log(info);
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send({error: 'User not found.'});
		}
		req.session.save((err) => {
			if (err) {
				return next(err);
			}
			res.send({success: true});
		});
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	console.log('Logging out');

	req.logout();
	res.send({message: 'logged out'})
});

router.get('/forgot', (req, res) => {
	res.render('forgot', {
		user: req.user
	});
});

module.exports = router;


