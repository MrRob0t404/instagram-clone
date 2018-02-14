import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log("submitted new user");
    axios
      .post("/users/new", {
        username: username,
        password: password
      })
      .then(res => {
					this.props.history.push(`/${this.state.username}`);
			})
			.catch(err => {
				this.setState({
					message: "Error creating new user."
				})
			})

  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="regMain">
        <div className="regAndLoginDiv">
          <div className="regDiv">
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
            {/* <div className="regLoginDiv"> */}
              <p>
                Have an account? <Link to="/login">Login</Link>
              </p>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
