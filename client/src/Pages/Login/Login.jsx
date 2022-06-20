import React, { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const renderError = () => {
	// 	const errorMessage = 'error message';
	// 	return <Message message={errorMessage} open={true} severity={'error'} />;
	// };

	const handleSubmit = () => {
		console.log('email:', email, 'password:', password);
	};

	return (
		<div className='flex h-screen justify-center items-center'>
			<div className='bg-dark-blue w-3/12 text-gray-light flex flex-col justify-center items-center space-y-7 rounded-md'>
				{/* {renderError()} */}
				<h1 className='text-4xl mt-4'>Login</h1>
				<p>Enter your email and password</p>
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

export default Login;
