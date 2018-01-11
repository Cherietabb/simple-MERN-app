// Clean up this file to become the basis for logging in users.
// Add bcryptjs?

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required']
	},
	email: {
		type: String,
		required: [true, 'email field is required'],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true
	},
	username: {
		type: String,
		required: [true, 'A username is required'],
		match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
		unique: true,
		index: true
	},
	password: {
		type: String,
		required: [true, 'Please provide a password']
	}
});

UserSchema.pre('save', next => {
	const user = this;
	if (!user.isModified(password)) {
		return next();
	}
	return bcrypt
		.hash(user, password, 10)
		.then(hashedPassword => {
			user.password = hashedPassword;
			return next();
		})
		.catch(next);
});

UserSchema.methods.comparePassword = (password, next) => {
	// when this method is called, compare the plain text password with the password in the database.
	return bcrypt.compare(password, this.password, (err, isMatch) => {
		if (err) {
			return next(err);
		}
		return next(null, isMatch);
	});
};

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = mongoose.model('User', UserSchema);

module.exports = User;