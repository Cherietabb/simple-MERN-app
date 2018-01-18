const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('cookie-session');
const path = require('path');
const multer = require('multer');
const pug = require('pug');
const Profile = require('./models/profile');

// Set storage engine
const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: ((req, file, cb) => {
		cb(null, file.fieldName + '-' + Date.now() + path.extname(file.originalname))
	})
});

//Init
const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000},
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
});

// Check File Type
checkFileType = (file, cb) => {
	// Allowed extensions
	const fileTypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
	// Check mimetype
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extname) {
		return cb(null, true)
	} else {
		return cb('Error: images only')
	}
};


const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, {useMongoClient: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;

// Check connection
db.once('open', () => {
	console.log('Connected to MongoDB')
});

// Check for db errors
db.on('error', (err) => {
	console.log(err);
});

app.use(session({
	secret: keys.cookieSession,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true },
	maxAge: 30 * 24 * 60 * 60 * 1000
}));

app.use((err, req, res, next) => {
	res.status(422).send({error: err.message});
	next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', require('./routes/userRoutes'));
app.use('/profiles', require('./routes/profileRoutes'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`App currently running on port ${port}...`)
});
