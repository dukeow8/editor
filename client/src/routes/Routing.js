import React, { useEffect, useContext } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import AuthContext from "../contexts/auth/Auth.context";
import NavBar from "../components/Navbar";
// routes

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreatePost from "../pages/CreatePost.js";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import SubscribePost from "../pages/SubscribePosts";
import Reset from "../pages/ResetPassword.js";
import NewPass from "../pages/NewPassword.js";

const Routing = () => {
	const { state } = useContext(AuthContext);

	// authenticated
	useEffect(() => {
		state.isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />;
	});

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<NavBar nav="home" />
					<SubscribePost />
				</Route>
				<Route path="/explore">
					<NavBar nav="explore" />
					<Home />
				</Route>
				<Route path="/create">
					<NavBar nav="add post" />
					<CreatePost />
				</Route>
				<Route exact path="/profile">
					<NavBar nav="profile" />
					<Profile />
				</Route>
				<Route path="/profile/:userid">
					<NavBar />
					<UserProfile />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route exact path="/reset">
					<Reset />
				</Route>
				<Route path="/reset/:token">
					<NewPass />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routing;
