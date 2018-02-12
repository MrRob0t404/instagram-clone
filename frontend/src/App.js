import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Register from './users/Register';
import Login from './users/Login';

class App extends Component {
  login = () => {
    return (
      <div>
        <h1>Instagram</h1>
      </div>
    )
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
