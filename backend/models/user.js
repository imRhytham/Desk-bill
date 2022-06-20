const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, required: true, maxlength: 32 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			enum: ['user', 'admin'],
			required: false,
		},
		history: { type: Array, default: [] },
		phone: { type: Number, required: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
