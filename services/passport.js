const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const keys = require('../config/keys');

// get access to the user model class from User.js
const User = mongoose.model('users');

// The user.id is a shortcut to the id generated in the mongodb collection.  It's not the same as the googleId.
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		})
});

// GoogleStrategy has an internal identifier of  the string google.
passport.use('login', new LocalStrategy(
	(username, email, password, done) => {
		User.findOne({username: username}, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {message: 'No user found'});
			}
			if (!user.password) {
				return done(null, false);
			}
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch) {
					return done(null, user)
				} else {
					return done(null, false, {message: 'Wrong password'});
				}
			});

			return done(null, user)
		});
	}
));

