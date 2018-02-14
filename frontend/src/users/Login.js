import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ username, password, handleInput, handleSubmitLogin, message }) => {
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmitLogin}>
				<input type="text" placeholder="username" onChange={handleInput} name="username" value={username} /><br />
				<input type="password" placeholder="password" onChange={handleInput} name="password" value={password} /><br />
				<input type="submit" />
			</form>

			{<Link to='/register'>Register</Link>}
			{message ? <h5>{message}</h5> : null}
		</div>
	)
}

export default Login;
