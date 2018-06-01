const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name field is required']
	},
	description: {
		type: String
	},
	// store profile image
	imageUrl: {
		type: String
	}
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;