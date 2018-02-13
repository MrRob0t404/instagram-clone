import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    this.props.history.push(`/${this.state.username}`);
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="regAndLoginDiv">
        <img
          className="instaLetters"
          src="http://pngimg.com/uploads/instagram/instagram_PNG5.png"
          alt="Instagram"
        />
        <h4 className="signupMsg">
          Sign up to see photos and<br /> videos from your friends.
        </h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleInput}
            name="username"
            className="regInput"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={this.handleInput}
            name="password"
            className="regInput"
          />
          <br />
          <input
            type="submit"
            className=""
            value="Sign up"
            className="regSubmit"
          />
        </form>

        <p className="terms">
          By signing up, you agree to our<br />{" "}
          <span className="bold">Terms</span> &{" "}
          <span className="bold">Privacy Policy</span>
        </p>

        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Register;
