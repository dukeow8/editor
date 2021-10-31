import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
	/*
  copyright = 2021
  
  */
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link to="/">insta_Editor</Link> {new Date().getFullYear()}
			{"."}
		    {/* <p>Editor copyrights © 2021</p> */}
		</Typography>
	);
};

export default Copyright;
