const express = require('express');
const path = require('path');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

const whiteList = ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:8000', undefined];
app.use(
	cors({
		origin: (origin, callback) => {
			if (whiteList.indexOf(origin) !== -1) {
				return callback(null, true);
			} else {
				return callback(new Error('CORS policy does not allow access'), false);
			}
		},
	})
);
app.use(express.json());
//serve FE app
app.use(
	express.static(path.join(__dirname, '..', 'public'))
);
app.use(planetsRouter);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
