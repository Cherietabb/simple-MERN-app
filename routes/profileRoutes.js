const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const upload = multer({
	limits: {
		filesize: 1024 * 1024 * 5
	},
	fileFilter: function (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return cb(new Error('Only image files are allowed!'));
		}
		cb(null, true);
	},
	filename: (req, file, cb) => {
		cb(null, file.filename + '-' + Date.now() + originalname)
	}

}).single('image');


router.get('/', (req, res, next) => {
	Profile.find({})
		.then((profile) => {
			res.send(profile);
		}).catch(next);
});

router.post("/add_profile", upload, (req, res) => {
	const profile = req.body;
	console.log(req.body);
	if (req.file) {
		profile.image = {
			data: req.file.buffer,
			contentType: req.file.mimetype.toLowerCase()
		};
		console.log(req.file);
	}
	Profile.create(profile)
		.then((profile) => res.send({ message: "Profile successfully created!" }))
		.catch(err => res.status(500).send(err));
});

router.put('/edit/:id', (req, res, next) => {
	Profile.findByIdAndUpdate({_id: req.params.id}, req.body)
		.then(() => {
			Profile.findOne({_id: req.params.id})
				.then((profile) => {
					res.send(profile)
				}).catch(next);
		});
});

router.delete('/:id', (req, res, next) => {
	Profile.findByIdAndRemove({_id: req.params.id}, req.body)
		.then(() => {
			Profile.findOne({_id: req.params.id})
				.then((profile) => {
					res.send(profile)
				}).catch(next);
		});
});

module.exports = router;