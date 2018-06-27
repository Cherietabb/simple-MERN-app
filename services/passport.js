const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// get access to the user model class from User.js
const User = mongoose.model('users');

// The user.id is a shortcut to the id generated in the mongodb collection.
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		})
});


passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({ username })
		.then(user => {
			if(!user || user.comparePassword(password)) {
				done(null, false, {message: 'Invalid username/password'});
			} else {
				done(null, user)
			}
		})
}));