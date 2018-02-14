import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Register from './users/Register';
// import Login from './users/Login';
import Profile from './users/Profile';
import User from './users/User';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={User} />
          <Route path='/:username' component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
