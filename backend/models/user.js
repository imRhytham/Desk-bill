const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, required: true, maxlength: 32 },
		email: { type: String, required: true, unique: true },
		hashed_password: { type: String, required: true },
		salt: { type: String },
		role: {
			type: string,
			enum: ['user', 'admin'],
			required: false,
		},
		history: { type: Array, default: [] },
		phone: { type: Number, required: true },
	},
	{ timestamps: true }
);

// virtual field
userSchema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = uuidv1();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.methods = {
	encryptPassword: function (password) {
		if (!password) return;
		try {
			return crypto
				.createHmac('abc123', this.salt) // hash based on salt
				.update(password) // hash password with salt
				.digest('hex'); // return hashed password
		} catch (err) {
			return '';
		}
	},
};

module.exports = mongoose.model('User', userSchema);
