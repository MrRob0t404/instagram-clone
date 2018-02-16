import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Register from './users/Register';
// import Login from './users/Login';
import Profile from './users/Profile';
import User from './users/User';

import Feed from "./users/Feed";

const home = () => {
  return(
    <div>
     <h1>Welcome to Instagram Website</h1>
    </div>
  )
}

class App extends Component {




  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/home" render={home}/>
          <Route path='/register' component={Register} />
          <Route path='/login' component={User} />
          <Route path='/:username' component={Profile} />
          {/*<Route path="/:username/test" render={this.test} />*/}
        </Switch>
      </div>
    );
  }
}

export default App;
