const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const keys = require('../config/keys');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


aws.config.update({
	secretAccessKey: keys.s3SecretAccessKey,
	accessKeyId: keys.s3AccessKeyId,
	region: keys.s3Region,
	signatureVersion: 'v4',
});

s3 = new aws.S3({});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: keys.s3Bucket,
		metadata: (req, file, cb) => {
			cb(null, {fieldname: file.fieldname})
		},
		contentType: multerS3.AUTO_CONTENT_TYPE,
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

	// filename: (req, file, cb) => {
	// 	cb(null, req.file.filename + '-' + Date.now() + originalname)
	// }
}).single('image');

router.get('/', (req, res, next) => {
	Profile.find({})
		.then((profile) => {
			res.send(profile);
		}).catch(next);
});

router.post("/add_profile", upload, (req, res) => {
	const profile = req.body;
	const image = req.file;
	console.log('Body:', profile);
	console.log('File:', image);

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