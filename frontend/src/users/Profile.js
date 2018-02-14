import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import Logout from './Logout';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      username: "username",
      bio: "bio",
      followerCount: 0,
      followingCount: 0,
      postCount: 0,
      images: [],
      message: "",
			addImg: false,
			newURL: "",
			newDesc: ""
    };
  }

  componentDidMount() {
    axios
      .get(`/users/${this.state.username}/posts`)
      .then(res => {
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
	
	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  handleAddImage = e => {
    this.setState({ addImg: !this.state.addImg });
	};
	
	handleSubmit = e => {
		e.preventDefault();
		axios
			.post('/users/postImage', {
				post_descrip: this.state.newDesc,
				img: this.state.newURL
			},
			this.setState({
				newDesc: "",
				newURL: "",
				message: "Added image",
				addImg: false
			})
		)
			.then(res => {
				console.log("Added image!")
			})
			.catch(err => {
				this.setState({
					message: "Error posting new image"
				})
			})
	}

  render() {
    const { searchInput, username, bio, followerCount, followingCount, postCount, images, message, addImg, newDesc, newURL
    } = this.state;
    // add logo and instaLetters to be a link to /feed/username?
    return (
      <div>
        <nav>
          <div className="logoDiv">
            <img
              className="logo"
              src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-48.png"
              alt="Instagram camera logo"
            />
            <div className="verticalLine" />
            <img className="instaLettersProfile" src="http://pngimg.com/uploads/instagram/instagram_PNG5.png" alt="Instagram"
            />
          </div>
          <input className="searchbar" type="text" value={searchInput} onChange={this.handleInput} name="searchInput" placeholder="Search" />
          <Link to={`/${username}`}>{username}</Link>
					<Logout />
        </nav>

        <div>
          <button onClick={this.handleAddImage}>Add Image</button>
        </div>

        <div>
          {addImg ? (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" value={newURL} placeholder="URL" name="newURL" onChange={this.handleInput} />
                <input type="text" value={newDesc} placeholder="Description" name="newDesc" onChange={this.handleInput} />
                <input type="submit" />
              </form>
            </div>
          ) : (
            ""
          )}

          <div className="profileBlurb">
            <h2>{username}</h2>
            <p className="profileP">{postCount} posts</p>
            <p className="profileP">{followerCount} followers</p>
            <p className="profileP">{followingCount} following</p>
            <p>{bio}</p>
          </div>
          <hr className="profileHR" />
          {images.map(imgURL => {
            return (
              <img src={imgURL} alt="user image" className="profileImage" />
            );
          })}
        </div>
      </div>
    );
  }
}
