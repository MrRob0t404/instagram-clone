import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import Logout from "./Logout";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: "",
      followers: "",
      images: [],
      addImage: false,
      newDesc: "",
      newURL: ""
    };
  }

  componentDidMount() {
    axios
      .get(`/users/followers`)
      .then(res => {
        this.setState({
          followers: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`/users/followees`)
      .then(res => {
        this.setState({
          following: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    // axios
    //   .get(`/users`)
    //   .then(res => {
    //     this.setState({
    //       images: res.data
    //     });
    //   })
    // .catch(err => {
    //   console.log(err);
    // });
    this.getImages();
  }

  getImages = () => {
    axios
      .get(`/users`)
      .then(res => {
        this.setState({
          images: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // -------------------- PROFILE HANDLER FUNCTIONS -------------------- //
  handleSubmitPost = e => {
    e.preventDefault();
    axios
      .post(
        "/users/postImage",
        {
          post_descrip: this.state.newDesc,
          img: this.state.newURL
        },
        this.setState({
          newDesc: "",
          newURL: "",
          message: "Added image",
          addImage: false
        }),
        this.getImages()
      )
      .then(res => {
        console.log("Added image!");
      })
      .catch(err => {
        this.setState({
          message: "Error posting new image"
        });
      });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleAddImage = e => {
    this.setState({ addImage: !this.state.addImage });
  };

  render() {
    const { user_id, username, bio } = this.props;
    const {
      newDesc,
      newURL,
      followers,
      following,
      images,
      follower,
      addImage
    } = this.state;

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
            <img
              className="instaLettersProfile"
              src="http://pngimg.com/uploads/instagram/instagram_PNG5.png"
              alt="Instagram"
            />
          </div>
          <input
       			className="searchbar"
       			type="text"
       			value=""
       			onChange=""
       			name="searchInput"
       			placeholder="Search"
     			/>
          <Link to={`/${username}`}>{username}</Link>
          <Logout />
        </nav>

        <div>
          <button className="addImageButton" onClick={this.handleAddImage}>Add Image</button>
        </div>

        <div>
          {addImage ? (
            <div>
              <form onSubmit={this.handleSubmitPost}>
                <input
                  type="text"
                  value={newURL}
                  placeholder="URL"
                  name="newURL"
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  value={newDesc}
                  placeholder="Description"
                  name="newDesc"
                  onChange={this.handleInput}
                />
                <input type="submit" />
              </form>
            </div>
          ) : (
            ""
          )}

          <div className="profileBlurb">
            <h2>{username}</h2>
            <p className="profileP">{images.length} posts</p>
            <p className="profileP">{followers.length} followers</p> 
            <p className="profileP">{following.length} following</p>
            <p>{bio}</p>
            <ul>
              {followers
                ? followers.map(follower => {
                    return (
                      <li>
                        <Link to="/follower.username">{follower.username}</Link>
                      </li>
                    );
                  })
                : "no any followers yet"}
            </ul>
          </div>
          <hr className="profileHR" />
          {images
            ? images.map(imgURL => {
                return (
                  <div>
                    <img src={imgURL.img} alt="user image" className="profileImage" />
                    <p> <span className="boldBlackText">{imgURL.username}</span> {imgURL.post_descrip} </p>
                  </div>
                );
              })
            : "No images"}
        </div>
      </div>
    );
  }
}

export default Profile;
