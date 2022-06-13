const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
		});
		console.log('Database connected...');
	} catch (err) {
		console.error(err.message);
		//  Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
