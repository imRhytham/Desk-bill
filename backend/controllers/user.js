const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const User = require('../models/user');

// @route   POST api/user/signup
// @desc    Register user
// @access  Public
const signUp = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	let { name, email, password, phone } = req.body;

	//check all fields
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'PLease enter password with >6 letter').isLength({
			min: 6,
		}),
		check('phone', 'Phone is required').isMobilePhone(),
	];

	try {
		//check for existing user
		const userExist = await User.findOne({ email });
		if (userExist) {
			res.status(400).json({ message: 'User already exist' });
		}

		//create user
		const user = new User({
			name,
			email,
			phone,
			password,
		});

		//hash password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		//return token
		let payload = {
			user: {
				id: user._id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWTKEY,
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.header('x-auth-token').json({ token });
			}
		);
	} catch (err) {
		res.status(500).send('Server Error');
		console.error(err.message);
	}
};

// @route   POST api/user/login
// @desc    Login user
// @access  Public
const login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	let { email, password } = req.body;
	try {
		let user = await User.findOne({ email });

		//check for user
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		//check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Incorrect password' });
		}

		//return token
		let payload = {
			user: {
				id: user._id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWTKEY,
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.header('x-auth-token').json({ token });
			}
		);
	} catch (error) {
		res.status(500).send('Server Error');
		console.error(err.message);
	}
};

// @route   GET api/user/profile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).send('Server Error');
		console.error(error.message);
	}
};

module.exports = { signUp, login, getProfile };
