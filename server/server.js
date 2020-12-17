const express = require('express');
const path = require('path');
require('dotenv').config();
const storyRouter = require('./routes/router.js')
const userRouter = require('./routes/userRouter.js')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 5000;

app.use('/story', storyRouter)
app.use('/user', userRouter)



// serve main app
app.get('/', (req, res) => {
	console.log(req);
	res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/encryptme', (req, res) => {
	console.log("req.query: ", req.query.password)
	let saltRounds = 10;
	bcrypt.hash(req.query.password, saltRounds, (err, hash) => {
		res.send({
			before: req.query.password,
			after: hash
		})
	})
})

// const myHash = hash

app.get('/compareme', (req, res) => {
	const plainTextPass = req.query.password;
	bcrypt.compare(plainTextPass, myHash, (err, result) => {
		res.send(result) //should be true
	})
})

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = { ...defaultErr, ...err };
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// starting server
app.listen(PORT, (err) => {
	if (err) return console.log(err);
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});