import React, { Component } from "react";
import axios from "axios";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import Feed from "./Feed";

import Logout from "./Logout";

const test = () => {
  console.log("calling test");
  return(
    <div>
      <h1>another test</h1>
      hyfhfhfgrr
      eargaergrea
      aergaergear
      aregaergaeg
      aergaerg
      test 2
    </div>
  )
}

class  Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      following: "",
      followers: "",
      images: [],
      imagesLength: [],
      addImage: false,
      newDesc: "",
			newURL: "",
      feeds: [],
      comment: "",
      likes: []
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
              imagesLength: res.data.length,
            });
          })
          .catch(err => {
            console.log(err);
          });

  }


  getImages = () => {
    axios
      .get(`/users`)
      .then(res => {
        this.setState({
          images: res.data,
          imagesLength: res.data.length
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // -------------------- PROFILE HANDLER FUNCTIONS -------------------- //
	handleSubmitPost = e => {
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
				addImage: false
			}),
      this.getImages()
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

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

	handleAddImage = e => {
    this.setState({ addImage: !this.state.addImage });
	};

  handleClickPosts = () => {
    axios
      .get(`/users`)
      .then(res => {
        this.setState({
          images: res.data,
          imagesLength: res.data.length,
          feeds: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClickFeeds = () => {
    axios
      .get(`/users/feeds/all`)
      .then(res => {
        console.log(res.data);
        this.setState({
          feeds: res.data,
          images: ""
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  likePost = (e) => {
    axios
      .post(`/users/like/test`, {post_id: e.target.id})
      .then(res => {

      })
      .catch(err => {
        console.log(err);
      });
      axios
        .post(`/users/get/likes`, {post_id: e.target.id})
        .then(res => {
          console.log(res.data);
          this.setState({
            likes: res.data
          })
        })
        .catch(err => {
          console.log(err);
        });
  }


  handleSubmitComment = (e) => {
    e.preventDefault();
    axios
      .post(`/users/comment/it`, {
        post_id: e.target.id,
        comment: this.state.comment
      })
      .then(res => {
        this.setState({
          comment: ""
        })
      })
      .catch(err => {
        console.log(err);
      });

      axios
      .post("/users/get/comments", {
        post_id: e.target.id
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClickFollowings = () => {

  }

  render() {
    const { user_id, username, bio } = this.props;
    const { newDesc, newURL, followers,
            following, images, follower,
            addImage, feeds, imagesLength, comment, likes } = this.state;
console.log(comment);
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
     <button onClick={this.handleAddImage}>Add Image</button>
   </div>

   <div>
     {addImage
       ? (
         <div>
           <form onSubmit={this.handleSubmitPost}>
             <input
               type="text"
               value={newURL}
               placeholder="URL"
               name="newURL"
               onChange={this.handleInput}/>
             <input
               type="text"
               value={newDesc}
               placeholder="Description"
               name="newDesc"
               onChange={this.handleInput}/>
             <input type="submit"/>
           </form>
         </div>
       )
       : ("")}

     <div className="profileBlurb">
       <h2>{username}</h2>
         <button onClick={this.handleClickPosts}>posts</button> {imagesLength}{" "}
         <button onClick={this.handleClickFeeds}>followers</button> {followers.length}{" "}
         <button onClick={this.handleClickFollowings}>following</button> {following.length}{" "}
       <p>{bio}</p>

       <ul>
          {followers? followers.map( follower => {
            return <li><Link to={`/${follower.username}`}>{follower.username}</Link></li>
          }): "no any followers yet"}
        </ul>

     </div>
     <hr className="profileHR"/>
      {images? images.map(imgURL => {
         return <div><img src={imgURL.img} alt="user image" className="profileImage"/>
         <p>{imgURL.username}: {imgURL.post_descrip}</p></div>
       }): null}
       {feeds? feeds.map( (feed, index) => {
          return <div><img src={feed.img} alt="user image" className="profileImage"/>
          <br></br>{feed.username}: {feed.post_descrip}
          <br/>
          {feed.comment}
          <br></br>
          <button
            id={feed.post_id}
            onClick={this.likePost}>
            like
          </button>{likes.length}
          <form onSubmit={this.handleSubmitComment} id={feed.post_id}>
          <input
            placeholder="comment"
            type="text"
            name="comment"
            onChange={this.handleInput}
          />
          <button >submit</button>
          </form><br></br><br></br><br></br></div>
        }): ""}
   </div>
 </div>
  )

  }
};

export default Profile;
