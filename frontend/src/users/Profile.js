import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default class Profile extends Component {
  constructor() {
		super();
		this.state = {
			username: "",
			bio: "",
			followerCount: 0,
			followingCount: 0,
			images: [],
      loggedIn: false
		}
	}

	componentDidMount() {
		axios
			.post('/users/postImage', {
				post_descrip: this.state.newDesc,
				img: this.state.newURL
			})
			.then(res => {
				this.setState({
					message: "Added image"
				})
			})
			.catch(err => {
				this.setState({

				})
			})
	}

	render() {
		return (
			<div>
        <Logout />
			</div>
		)
	}
}
