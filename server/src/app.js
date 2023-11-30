const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

const whiteList = ['http://localhost:3000', 'http://localhost:5000'];
app.use(
	cors({
		origin: (origin, callback) => {
			if (whiteList.includes(origin)) {
				return callback(null, true);	
			} else {
				return callback(new Error('CORS policy does not allow access'), false);
			}
		},
	})
);
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
