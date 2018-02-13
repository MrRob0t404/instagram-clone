import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			username: "",
			password: "",
			loggedIn: false
		}
	}

	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		console.log('logged in', this.state)
		this.setState({
			username: "",
			password: "",
			loggedIn: true
		})
		
		this.props.history.push(`/${this.state.username}`)
	}

	render() {
		const { username, password, loggedIn } = this.state;
		console.log("after login", this.state)

		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="username" onChange={this.handleInput} name="username" value={username} />
					<br />
					<input type="password" placeholder="password" onChange={this.handleInput} name="password" value={password} />
					<br />
					<input type="submit" />
				</form>
				
				<Link to='/'>Register</Link>
			</div>
		)
	}
}

export default Login;
