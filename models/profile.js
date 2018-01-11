// This will become its own Schema, separate from the User Schema
// This Schema may need to be renamed

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	name: {
		type: String,
		required: [true, 'email field is required']
	},
	description: {
		type: String
	}
	// store profile image

});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileSchema;