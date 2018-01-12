const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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

// passport.use(new LocalStrategy(
// 	(username, email, password, done) => {
// 		User.findOne({username: username}, (err, user) => {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!user || !user.validPassword(password)) {
// 				return done(null, false, {message: 'Invalid username/password'});
// 			}
// 			bcrypt.compare(password, user.password, (err, isMatch) => {
// 				if (err) {
// 					return done(err);
// 				}
// 				if (isMatch) {
// 					return done(null, user)
// 				} else {
// 					return done(null, false, {message: 'Wrong password'});
// 				}
// 			});

passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({ username })
		.then(user => {
			if(!user || user.validPassword(password)) {
				done(null, false, {message: 'Invalid username/password'});
			} else {
				done(null, user)
			}
		})


}));