import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 0,
      username: "",
      password: "",
      followers: [],
      following: [],
      message: "",
			loggedIn: false,
			bio: ""
    };
  }

  componentDidMount() {
    if (this.state.username) {
      axios
        .get(`/users/${this.state.username}/posts`)
        .then(res => {
          console.log(res);
          this.setState({
            username: res.data.username,
            bio: res.data.bio,
            followerCount: res.data.followers.length,
            followingCount: res.data.following.length,
            images: res.data.images
          });
        })
        .catch(err => {
          this.setState({
            message: `Error retrieving profile for ${this.state.username}.`
          });
        });
    }
  }

// -------------------- GENERAL HANDLER FUNCTIONS -------------------- //
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

	// -------------------- LOGIN HANDLER FUNCTIONS -------------------- //
  handleSubmitLogin = e => {
		e.preventDefault();
		console.log('something')
    const { username, password, loggedIn } = this.state;
    axios
      .post("/users/login/", {
        username: username,
        password: password
      })
      .then(res => {
        this.setState({
          loggedIn: true
        });
        this.props.history.push(`/${this.state.username}`);
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: err.response.data
        });
      });
	};



	// -------------------- RENDER FUNCTIONS -------------------- //
  renderLogin() {
    const { username, password, message } = this.state;
    return (
      <Login
        username={username}
        password={password}
        message={message}
        handleInput={this.handleInput}
        handleSubmitLogin={this.handleSubmitLogin}
      />
    );
  }

  renderProfile() {
    const { user_id, username, followers, following, message, addImg, newURL, newDesc, bio, images } = this.state;
		return (
			<Profile
				user_id={user_id}
				username={username}
				followers={followers}
				following={following}
				message={message}
				addImg={addImg}
				handleInput={this.handleInput}
				handleSubmitPost={this.handleSubmitPost}
				handleAddImage={this.handleAddImage}
				images={images}
			/>
		)
	}

  // ternary: if loggedin true - profile, else login
  render() {
    const { username, password, loggedIn, message } = this.state;

    return(<div>
              {loggedIn ? this.renderProfile() : this.renderLogin()}
          </div>);
  }
}

export default User;
