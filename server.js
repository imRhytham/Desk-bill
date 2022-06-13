const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;
// import routes
const userRoutes = require('./backend/routes/user');
const connectDB = require('./config/db');

//app
app.use(cors());
app.use(express.json());

// db
connectDB();

//routes middleware
app.use('/api', userRoutes);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
