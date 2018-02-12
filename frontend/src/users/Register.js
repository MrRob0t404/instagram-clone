import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
		console.log("submitted new user");
		// implement redirect after axios call
		// this.props.history.push('/feed')
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
				<h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={this.handleInput}
            name="username"
          /><br />
          <input
            type="password"
            placeholder="password"
            onChange={this.handleInput}
            name="password"
          /><br />
          <input type="submit" />
        </form>

				<Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default Register;
