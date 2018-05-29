const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const keys = require('../config/keys');
const aws = require('aws-sdk');
const uuid = require('uuid');

const s3 = new aws.S3({
	accessKeyId: keys.s3AccessKeyId,
	secretAccessKey: keys.s3SecretAccessKey,
	region: keys.s3Region,
	signatureVersion: 'v4',
});

router.get('/', (req, res, next) => {
	Profile.find({})
		.then((profile) => {
			res.send(profile);
		}).catch(next);
});

router.get('/upload', (req, res) => {
	const key = `images/${uuid()}.jpeg`;

	s3.getSignedUrl('putObject', {
			Bucket: 'simple-mern-app',
			Key: key,
			ContentType: 'image/jpeg'
		},
		((err, url) => res.send({ key, url }))

	)

});

router.post("/add_profile", (req, res) => {
	const profile = req.body;

	Profile.create(profile)
		.then((profile) => res.send({message: "Profile successfully created!"}))
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
					res.send(profile);
					res.send({message: 'Profile deleted!'})
				}).catch(next);
		});
});

module.exports = router;