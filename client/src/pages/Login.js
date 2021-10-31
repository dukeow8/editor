import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthenticationContext from "../contexts/auth/Auth.context";
import { FETCH_USER_DATA } from "../contexts/types.js";
import { LOGIN_URL } from "../hooks/constants";
import Copyright from "../components/Copyight";
import { EmailRegex } from "../utils/regex";
import axios from "axios";
// Material-UI Components
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

// General Styles
const useStyles = makeStyles((theme) => ({
	Logo: {
		fontFamily: "Grand Hotel, cursive",
		margin: "0px 0px 20px 0px",
	},
	paper: {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		height: "100vh",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
}));

const Login = () => {
	//get the dispatch method from the useContext custom hook
	const { dispatch } = useContext(AuthenticationContext);// read dispatch method from context
    //navigate 
	const history = useHistory();
	const classes = useStyles();

	const [email, setEmail] = useState("");//read the value of email from context
	const [password, setPassword] = useState("");//read the value of password 
	const [formatValidation, setFormatValidation] = useState(false);
	const [authValidation, setAuthValidation] = useState(false);	//Toggle the authValidation Button to show the Dialog
/**
   * Handle input changes
   *
   * Update the postData object to hold the newest value for an input
   * when the value is changed. This is done so we can have a single source
   * of truth for the inputs.
   *
   * @param {object} event Event object that executed the function.
   */
	const handleInputChanges = (e) => {
	 // Get the right value for the type of input.
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	};

	const PostData = () => {
		// the Regex email validation was token from : https://emailregex.com/
		if (EmailRegex.test(email)) {
			// request method from api
			axios.post(LOGIN_URL, { password, email })
				.then((res) => {
					const data = res.data;
					if (data.error) {
						// Update state with new value for the input.
						setFormatValidation(false);
						setAuthValidation(true);
					} else {
						// store generated token in order to use it to access protected endpoints
						localStorage.setItem("jwt", data.token);
						//store the user details
						localStorage.setItem("user", JSON.stringify(data.user));
						dispatch({ type: FETCH_USER_DATA, payload: data.user });
						// redirect the user to home page
						history.push("/");
					}
				})
				.catch((err) => {
					// that should be changed in Production
					// TODO : Make an error handler
					console.log(err);
				});
		} else {
			setAuthValidation(false);
			setFormatValidation(true);
		}
	};

	return (
		<Grid container>
			<Grid className={classes.image} item sm={4} md={6} />
			<Grid item xs={12} sm={8} md={6}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography className={classes.Logo} variant="h2" gutterBottom>
							Insta_editor
						</Typography>
						{formatValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid Email format — check it out!
							</Alert>
						) : null}
						{authValidation ? (
							<Alert variant="outlined" severity="error">
								Invalid given Email/Password — check it out!
							</Alert>
						) : null}
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								// autoComplete="email"
								autoFocus
								value={email}
								onChange={handleInputChanges}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={handleInputChanges}
							/>

							<Button
								fullWidth
								variant="outlined"
								color="primary"
								className={classes.submit}
								disabled={email !== "" && password !== "" ? false : true}
								onClick={PostData}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link to="/reset" style={{ textDecoration: "none" }}>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link to="/signup" style={{ textDecoration: "none" }}>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};

export default Login;
