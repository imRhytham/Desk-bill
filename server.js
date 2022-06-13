const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// import routes
const userRoutes = require('./backend/routes/user');

//app
app.use(cors());
app.use(express.json());

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// db
connectDB();

//define routes
app.use('/api', userRoutes);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
