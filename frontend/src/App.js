import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/explore'>explore</Link> {" "}
          <Link to='/:username'>profile</Link>
        </nav>

        <h1>Instagram</h1>

        <Switch>
          
        </Switch>
      </div>
    );
  }
}

export default App;
