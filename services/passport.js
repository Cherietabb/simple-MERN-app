const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then(user => {
				done(null, user);
			})
	});


	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		session: false,
		passReqToCallback : true
	}, (username, password, done) => {
			return User.findOne({username}, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {message: 'Incorrect username or password'});
				}
				return user.comparePassword(user.password, (passwordError, isMatch) => {
					if(!isMatch) {
							return done(null, false);
					}
					return done(null, user, {message: 'Successful login!'})
				})
			});

		}

	))
};