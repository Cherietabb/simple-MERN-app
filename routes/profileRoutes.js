const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

router.get('/', (req, res, next) => {
	Profile.find({})
		.then((profile) => {
			res.send(profile);
		}).catch(next);
});


router.post('/add', (req, res, next) => {
	Profile.create(req.body)
		.then((profile) => {
			res.send(profile)
			// res.render('edit_profile', {
				//profile: profile
			// )
		}).catch(next);
});

router.put('/profile/edit/:id', (req, res, next) => {
	Profile.findByIdAndUpdate({_id: req.params.id}, req.body)
		.then(() => {
			profile.findOne({_id: req.params.id})
				.then((profile) => {
					res.send(profile)
					// res.redirect('/')
				}).catch(next);
		});
});

router.delete('/profile/:id', (req, res, next) => {
	Profile.findByIdAndRemove({_id: req.params.id}, req.body)
		.then(() => {
			profile.findOne({_id: req.params.id})
				.then((profile) => {
					res.send(profile)
					//res.redirect('/')
				}).catch(next);
		});
});

module.exports = router;