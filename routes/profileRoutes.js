const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const multer = require('multer');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits: {fileSize: 10000000},
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
}).single('image');

// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}


router.get('/', (req, res, next) => {
	Profile.find({})
		.then((profile) => {
			res.send(profile);
			res.render('/')
		}).catch(next);
});


/*
 router.post('/add_profile', (req, res, next) => {
 Profile.create(req.body)
 .then((profile) => {
 res.send(profile);
 res.render('/add_profile', {profile: profile})
 .catch(next);
 });
 });
 */

router.post('/add_profile', (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			res.render('/add_profile', {
				msg: err
			});
		} else {
			if (req.file === undefined) {
				res.render('index', {
					msg: 'Error: No File Selected!'
				});
			} else {
				res.render('/add_profile', {
					msg: 'File Uploaded!',
					file: `uploads/${req.file.filename}`
				});
			}
		}
	});

	const newProfile = new Profile({
		name: req.body.name,
		description: req.body.description,
		img: req.file
	});

	newProfile.save((err, req) => {
			if (err) {
				res.status(401).json({
					message: err
				});
				console.log(err);
			}
		})
		.then((newProfile) => {
			res.send(newProfile);
			res.render('/add_profile', {newProfile: newProfile});
		})

	/*
	 const newProfile = new Profile({
	 name: req.body.name,
	 description: req.body.description,
	 image: req.file
	 });
	 */

});


router.put('/edit/:id', (req, res, next) => {
	Profile.findByIdAndUpdate({_id: req.params.id}, req.body)
		.then(() => {
			Profile.findOne({_id: req.params.id})
				.then((profile) => {
					res.send(profile)
					// res.redirect('/')
				}).catch(next);
		});
});

router.delete('/:id', (req, res, next) => {
	Profile.findByIdAndRemove({_id: req.params.id}, req.body)
		.then(() => {
			Profile.findOne({_id: req.params.id})
				.then((profile) => {
					res.send(profile)
					//res.redirect('/')
				}).catch(next);
		});
});

module.exports = router;