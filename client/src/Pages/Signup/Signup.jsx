import React, { useState } from 'react';
import axios from 'axios';
import { createBrowserHistory } from 'history';

const SignUp = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = createBrowserHistory();

	const handleSubmit = async () => {
		const payload = {
			name: name,
			phone: phone,
			email: email,
			password: password,
		};
		const response = await axios.post(
			'http://localhost:8000/api/user/signup',
			payload
		);
		if (response.status === 200 || response.status === 201) {
			history.push('/login');
		}
	};

	return (
		<div className='flex h-screen justify-center items-center'>
			<div className='bg-dark-blue w-3/12 text-gray-light flex flex-col justify-center items-center space-y-7 rounded-md'>
				{/* {renderError()} */}
				<h1 className='text-4xl mt-4'>Sign-up</h1>
				<p>Enter your details to sign-up with us. </p>
				<input
					className='w-10/12 p-2 border-2 border-gray-light rounded-md bg-dark-blue text-gray-light'
					placeholder='Name'
					value={name}
					type='text'
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					className='w-10/12 p-2 border-2 border-gray-light rounded-md bg-dark-blue text-gray-light'
					placeholder='Email'
					value={email}
					type='text'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					className='w-10/12 p-2 border-2 border-gray-light rounded-md bg-dark-blue text-gray-light'
					placeholder='Phone'
					value={phone}
					type='text'
					onChange={(e) => {
						setPhone(e.target.value);
					}}
				/>
				<input
					className='w-10/12 p-2 border-2 border-gray-light rounded-md bg-dark-blue text-gray-light'
					placeholder='Password'
					value={password}
					type='password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<button
					className='w-10/12 bg-green text-gray-dark	rounded-md p-2'
					onClick={handleSubmit}
				>
					submit
				</button>
				<br />
			</div>
		</div>
	);
};

export default SignUp;
