const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const SALT_FACTOR = 10;

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

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.pre('save', function(next) {
	let user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
			if (err) return next(err);
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
});

UserSchema.pre('update', function (next) {
	let user = this;

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
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

const User = mongoose.model('User', UserSchema);

module.exports = User;