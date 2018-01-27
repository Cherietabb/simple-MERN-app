const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const keys = require('../config/dev');
const multer = require('multer');
const path = require('path');
const multers3 = require('multer-s3');
const aws = require('aws-sdk');
const uuid = require('uuid');


aws.config.update({
	secretAccessKey: keys.secretAccessKey,
	accessKeyId: keys.accessKeyId,
	region: 'us-east-1'
});

s3 = new aws.S3();

const upload = multer({
	storage: multers3({
		s3: s3,
		bucket: 'simple-mern-app/images',
		metadata: (req, file, cb) => {
			cb(null, {fieldname: file.fieldname})
		},
		acl: 'public-read',
		key: (req, file, cb) => {
			const filename = `${Date.now()}-${file.originalname}`;
			cb(null, filename)
		}
}),
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
		cb(null, req.file.filename + '-' + Date.now() + originalname)
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
					res.send(profile)
				}).catch(next);
		});
});

module.exports = router;