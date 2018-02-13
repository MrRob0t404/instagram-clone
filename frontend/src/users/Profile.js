import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "testUsername",
      bio: "biography description goes here",
      followerCount: 0,
      followingCount: 0,
      postCount: 0,
      images: [
        "http://cdn.akc.org/Marketplace/Breeds/Shih_Tzu_SERP.jpg",
        "https://i.ytimg.com/vi/IslI1VaG4nM/maxresdefault.jpg",
        "http://cdn.akc.org/Marketplace/Breeds/Pekingese_SERP.jpg"
      ],
      message: ""
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

  render() {
    const {
      username,
      bio,
      followerCount,
      followingCount,
      postCount,
      images,
      message
    } = this.state;
    return (
      <div>
        <nav>
					<img
						src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-32.png"
						alt="Instagram camera logo"
					/>
          <img
            className="instaLettersProfile"
            src="http://pngimg.com/uploads/instagram/instagram_PNG5.png"
            alt="Instagram"
          />
          <Link to={`/${username}`}>{username}</Link>
        </nav>

        <div className="profileBlurb">
          <h2>{username}</h2>
          <p className="profileP">
            {postCount} posts
          </p>
          <p className="profileP">
            {followerCount} followers
          </p>
          <p className="profileP">
            {followingCount} following
          </p>
          <p>{bio}</p>
        </div>
        <hr className="profileHR" />
        {images.map(imgURL => {
          return <img src={imgURL} alt="user image" className="profileImage" />;
        })}
      </div>
    );
  }
}
