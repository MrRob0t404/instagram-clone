import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import Logout from "./Logout";

class  Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      following: "",
      followers: "",
      images: [],
      addImage: false
    }
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
  }

  addImages = () => {
    this.setState({
      addImage: true
    })
  }


  render() {
    const { user_id, username, message, newURL, newDesc,
            bio, handleInput, handleSubmitPost,
            handleAddImage, addImg } = this.props;
    const { followers, following, images, follower, addImage } = this.state;
  return (
    <div>
   <nav>
     <div className="logoDiv">
       <img
         className="logo"
         src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-48.png"
         alt="Instagram camera logo"/>
       <div className="verticalLine"/>
       <img
         className="instaLettersProfile"
         src="http://pngimg.com/uploads/instagram/instagram_PNG5.png"
         alt="Instagram"/>
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
     <Logout/>
   </nav>

   <div>
     <button onClick={handleAddImage}>Add Image</button>
   </div>

   <div>
     {addImg
       ? (
         <div>
           <form onSubmit={handleSubmitPost}>
             <input
               type="text"
               value={newURL}
               placeholder="URL"
               name="newURL"
               onChange={handleInput}/>
             <input
               type="text"
               value={newDesc}
               placeholder="Description"
               name="newDesc"
               onChange={handleInput}/>
             <input type="submit"/>
           </form>
         </div>
       )
       : ("")}

     <div className="profileBlurb">
       <h2>{username}</h2>
       <p className="profileP">
         posts</p> {images.length}
       <p className="profileP">
         followers</p> {followers.length}
       <p className="profileP">
         following</p>{following.length}
       <p>{bio}</p>

       <ul>
          {followers? followers.map( follower => {
            return <li><Link to="/follower.username">{follower.username}</Link></li>
          }): "no any followers yet"}
        </ul>

     </div>
     <hr className="profileHR"/>
      {images? images.map(imgURL => {
         return <img src={imgURL.img} alt="user image" className="profileImage"/>
       }): "No images"}
   </div>
 </div>
  )

  }
};

export default Profile;

// return (
//   <div>
//
//     <nav>
//       <div className="logoDiv">
//         <img
//           className="logo"
//           src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-48.png"
//           alt="Instagram camera logo"
//         />
//       </div>
//       <div className="verticalLine" />
//         <img
//           className="instaLettersProfile"
//           src="http://pngimg.com/uploads/instagram/instagram_PNG5.png"
//           alt="Instagram"
//         />
//       </div>
//       {/* <input
//         className="searchbar"
//         type="text"
//         value={searchInput}
//         onChange={handleInput}
//         name="searchInput"
//         placeholder="Search"
//       /> */}
//       </nav>
//       <Link to={`/${username}`}>{username}</Link>
//       <Logout />
//
//
//     <div>
//       <button onClick={this.addImages}>Add Image</button>
//     </div>
//
//     <div>
//       <div className="profileBlurb">
//         <h2>{username}</h2>
//         <p className="profileP"> posts {images.length}</p>
//         <p className="profileP"> followers {followers.length}</p>
//         <p className="profileP"> following {following.length}</p>
//         <p>{bio}</p>
//       </div>
//       <div>
//         <ul>
//           {followers? followers.map( follower => {
//             return <li><Link to="/follower.username">{follower.username}</Link></li>
//           }): "no any followers yet"}
//         </ul>
//       </div>
//       <div>
//         <hr className="profileHR" />
//         {images? images.map(imgURL => {
//           return <img alt="user image" src={imgURL.img} className="profileImage" />
//         }): "No images"}
//       </div>
//
//   </div>
// );
