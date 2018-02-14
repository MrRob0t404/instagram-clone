import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import Logout from "./Logout";

const Profile = ({ user_id, username, followers, following, message, newURL, newDesc, bio, handleInput, handleSubmitPost, images, handleAddImage, addImg }) => {
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
          <img
            className="instaLettersProfile"
            src="http://pngimg.com/uploads/instagram/instagram_PNG5.png"
            alt="Instagram"
          />
        </div>
        {/* <input
          className="searchbar"
          type="text"
          value={searchInput}
          onChange={handleInput}
          name="searchInput"
          placeholder="Search"
        /> */}
        <Link to={`/${username}`}>{username}</Link>
        <Logout />
      </nav>

      <div>
        <button onClick={handleAddImage}>Add Image</button>
      </div>

      <div>
        {addImg ? (
          <div>
            <form onSubmit={handleSubmitPost}>
              <input
								type="text"
                value={newURL}
                placeholder="URL"
                name="newURL"
                onChange={handleInput}
              />
              <input
                type="text"
                value={newDesc}
                placeholder="Description"
                name="newDesc"
                onChange={handleInput}
              />
              <input type="submit" />
            </form>
          </div>
        ) : (
          ""
        )}

        <div className="profileBlurb">
          <h2>{username}</h2>
          <p className="profileP"> posts</p>
          <p className="profileP"> followers</p>
          <p className="profileP"> following</p>
          <p>{bio}</p>
        </div>
        <hr className="profileHR" />
				{
					images? images.map(imgURL => {
          	return <img src={imgURL} alt="user image" className="profileImage" />
        	}) : "No images"}
      </div>
    </div>
  );
};

export default Profile;
