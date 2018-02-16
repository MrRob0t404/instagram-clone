import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Login from "./Login";

class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      statusText: "",
      logged: false
    };
  }

  setUser = user => {
    this.setState({ user: user, logged: true });
  };

  renderLogin = () => {
    return <Login setUser={this.setUser} />;
  };

handleLogout = (e) => {
  e.preventDefault();
  axios
    .get(`/users/logout`)
    .then(res => {
      this.setState({
        logged: false,
        user: null,
        statusText: res.statusText
      })
    })
    .catch(err => {
      console.log(err);
    });
}


  render () {
    const {user, logged, statusText} = this.state;
    if (statusText === "OK") {
      this.setState({statusText: ""})
      return <Redirect to="/login" />
    }
    return (
  		<div className="logoutButton">
        <button onClick={this.handleLogout}>sign out</button>
  		</div>
  	);
  }
};

export default Logout;
