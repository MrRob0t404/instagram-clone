import React from "react";
import { Link } from "react-router-dom";

const Login = ({
  username,
  password,
  handleInput,
  handleSubmitLogin,
  message
}) => {
  return (
    <div className="loginDiv">
      <img
        className="instaLetters"
        src="http://pngimg.com/uploads/instagram/instagram_PNG5.png?i=1"
        alt="Instagram"
      />
      <form onSubmit={handleSubmitLogin}>
        <input
          type="text"
          placeholder="username"
          onChange={handleInput}
          name="username"
          value={username}
          className="userPassInput"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={handleInput}
          name="password"
          value={password}
          className="userPassInput"
        />
        <br />
        <input type="submit" className="regLoginSubmit" value="Log in" />
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>

      {message ? <h5>{message}</h5> : null}
    </div>
  );
};

export default Login;
