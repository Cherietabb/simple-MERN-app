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


passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false); }
			if (!user.comparePassword(password)) {
				return done(null, false, {message: 'Invalid password'});
			}
			return done(null, user);
		});
	}
));