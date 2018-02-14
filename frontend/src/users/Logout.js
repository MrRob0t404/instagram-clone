// import React from "react";
// import axios from "axios";

// const Logout = ({ handleLogout, message, loggedIn }) => {
// 	const confirmLogout = () => {
// 		return (
// 			<div>
// 				<h3>Are you sure you want to logout?</h3>
// 				<button onClick={handleLogout}>Yes</button>
// 			</div>
// 		)
// 	}

// 	const loginFirst = () => {
// 		return (
// 			<div>
// 				<h3>You must first log in.</h3>
// 				<Link to='/login'>Login</Link>
// 			</div>
// 		)
// 	}

// 	handleLogout = () => {
// 		axios
// 			.get('/users/logout')
// 			.then(res => {
// 				console.log(res.data)
// 				this.setState({
// 					loggedIn: false
// 				})
// 			})
// 			.catch(err => {
// 				this.setState({
// 					message: "Error logging out."
// 				})
// 			})
// 			this.props.history.push('/') // send to landing page
// 	}

//   return (
// 		<div>
// 			{loggedIn ? confirmLogout() : loginFirst()}
// 		</div>
// 	);
// };

// export default Logout;