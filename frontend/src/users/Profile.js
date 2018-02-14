import React, { Component } from "react";
import axios from "axios";

export default class Profile extends Component {
  constructor() {
		super();
		this.state = {
			username: "",
			bio: "",
			followerCount: 0, 
			followingCount: 0,
			images: []
		}
	}
	
	componentDidMount() {
		axios
			.get('/users/something') // change later
			.then(res => {
				this.setState({

				})
			})
	}

	render() {
		return (
			<div>
			</div>
		)
	}
}