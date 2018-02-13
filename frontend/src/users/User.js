import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom';

import Login from './users/Login'

export default class User extends Component {
  constructor() {
    super();
    this.state = {};
	}
	
	render() {
		return (
			<div>
				<nav>
					<Link to='/feed'>feed</Link>
					<Link to='/profile'>profile</Link>
				</nav>
			
				{/* <Route exact path='/' render={} /> */}
			</div>
		)
	}
}
