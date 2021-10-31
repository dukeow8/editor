import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { SIGNUP_URL } from "../hooks/constants";
import Copyright from "../components/Copyight";
import { EmailRegex } from "../utils/regex";
// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

// General Styles component
const useStyles = makeStyles((theme) => ({
	Logo: {
		fontFamily: "Grand Hotel, cursive",
		marginBottom: "42px",
		width: "fit-content",
		margin: "0px auto",
		marginTop: "40px",
	},
	paper: {
		marginTop: "10px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Signup = () => {
	const history = useHistory();//used to save a reference [state, setState] for each input
	const classes = useStyles();//value of classes used to style
	const [name, setName] = useState("");/***read the value of name and setName from context***/
	const [password, setPassword] = useState("");/***read the value of password and setPassword from context***/
	const [email, setEmail] = useState("");/***read the value of email and setEmail from context***/
	const [formatValidation, setFormatValidation] = useState(false);/***read the value of FormatValidation and setFormatValidation from context***/
	const [authValidation, setAuthValidation] = useState(false);/***read the value of setAuthValidation and setAuthValidation from context***/
	const [confirmValidation, setConfirmValidation] = useState(false);/***read the value of ConfirmValidation and setConfirmValidation from context***/
    //timerRef.current.start(); <-- function Stopwatch
	const timerRef = useRef();
    //save timer in useRef and pass it to the value stored
	useEffect(
		() => () => {// this will clear Timeout
			clearTimeout(timerRef.current);
		},
		//useEffect will run current time with empty []
		// this value changes (useEffect re-run)
		[]
	);
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
			case "username":
				setName(e.target.value);
				break;
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
		// Here we check just if the given email has a correct format
		if (EmailRegex.test(email)) {
			axios.post(SIGNUP_URL, {
				name,
				password,
				email,
			})
				.then((res) => {
					const data = res.data;
					if (data.error) {
						setFormatValidation(false);
						setAuthValidation(true);
					} else {
						// show the confirmation message
						setConfirmValidation(true);
						// set a timeOut before redirecting the user to login page
						timerRef.current = setTimeout(() => {
							history.push("/login");
						}, 2800);//wait for atleast  2 seconds before login
					}
				})
				.catch((err) => {
					console.log(err);//handle response errors
				});
		} else {
			setAuthValidation(false);
			setFormatValidation(true);
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Typography className={classes.Logo} variant="h2">
				editor
			</Typography>
			{/*  Check the format of the Email */}
			{formatValidation ? (
				<Alert variant="outlined" severity="error">
					Invalid Email format — check it out!
				</Alert>
			) : null}
			{/*  Check the if the Email already Exist */}
			{authValidation ? (
				<Alert variant="outlined" severity="error">
					This Email is already token — check it out!
				</Alert>
			) : null}
			{/* Success notification */}
			{confirmValidation ? (
				<Alert variant="outlined" severity="success">
					Your account has been created successfully — check it out!
				</Alert>
			) : null}
			<div className={classes.paper}>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="UserName"
								name="username"
								variant="outlined"
								required
								fullWidth
								label="User Name"
								autoFocus
								value={name}
								onChange={handleInputChanges}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={handleInputChanges}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={handleInputChanges}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid> */}
					</Grid>
					<Button
						fullWidth
						variant="outlined"
						color="primary"
						className={classes.submit}
						onClick={PostData}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login" style={{ textDecoration: "none" }}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Signup;
