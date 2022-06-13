const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;
// import routes
const userRoutes = require('./routes/user');

//app
app.use(cors());
app.use(express.json());

// db
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('connected to DB');
	})
	.catch((err) => {
		console.log('err', err);
	});

//routes middleware
app.use('/api', userRoutes);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
