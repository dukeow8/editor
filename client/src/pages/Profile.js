import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VerticalTabs from "../components/Info.js";
import { config as axiosConfig, MY_POST_URL, MY_BOOKMARKS_URL } from "../hooks/constants";

// Material-UI Components
import { makeStyles, withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

// Material-UI Icons
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

// General styles
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 935,
		margin: "auto",
		padding: "60px 20px 0",
	},
	dialogContainer: {
		"& .MuiDialog-paperWidthSm": {
			width: "80%",
			maxWidth: "900px",
		},
	},
	dialogTitle: {
		margin: "0px",
		padding: "16px",
	},
	avatar_container: { margin: "auto" },
	avatar: { width: 152, height: 152 },
	editButton: {
		marginLeft: 20,
	},
	settings: {},
	posts: {
		width: "270px",
		height: "230px",
	},
	posts_img: {
		width: "100%",
		height: "100%",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	closeButton: {
		position: "absolute",
		right: "8px",
		top: "8px",
		color: "#9e9e9e",
	},
}));

// EditProfile dialog content style
const DialogContent = withStyles((theme) => ({
	root: {
		padding: "16px",
	},
}))(MuiDialogContent);

// EditProfile dialog actions style
const DialogActions = withStyles((theme) => ({
	root: {
		margin: "0px",
		padding: "2px",
	},
}))(MuiDialogActions);

// Tabs data container
function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const ProfilePage = () => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [bookmarks, setBookmarks] = useState([]);
	const [value, setValue] = useState("Posts");

	const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(() => {
		axios.get(MY_POST_URL, config).then((res) => {
			setData(res.data.posts);
		});
		axios.get(MY_BOOKMARKS_URL, config).then((res) => {
			setBookmarks(res.data.bookmark);
		});
	}, []);// eslint-disable-line react-hooks/exhaustive-deps

	//Toggle the EditProfile Button to show the Dialog
	const [openEdit, setOpenEdit] = useState(false);

	const handleEditClickOpen = () => {
		setOpenEdit(true);
	};
	const handleEditClose = () => {
		setOpenEdit(false);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Box component="main" className={classes.root}>
				{/* User Profile Data Goes Here */}
				<Box mb="44px">
					<Grid container>
						<Grid item xs={4} className={classes.avatar_container}>
							<Avatar
								className={classes.avatar}
								style={{ margin: "auto" }}
								src="https://images.unsplash.com/photo-1635263590756-b5eebb38bad0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzN8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
							/>
						</Grid>
						<Grid item xs={8}>
							<Box clone mb="20px">
								<Grid container alignItems="center">
							
									<Button
										className={classes.editButton}
										variant="outlined"
										onClick={handleEditClickOpen}
									>
										Edit Profile
									</Button>
									<div className={classes.settings}>
										<IconButton component={Link} to="#">
											<Icon>settings</Icon>
										</IconButton>
									</div>
								</Grid>
							</Box>
							<Box mb="20px">
								<Grid container spacing={4}>
									<Grid item>
										<Typography variant="subtitle1">
											<b>{data.length}</b> posts
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1">
											
											followers
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1">
										
											following
										</Typography>
									</Grid>
								</Grid>
							</Box>
							<Typography variant="subtitle1">Banda Ndumiso</Typography>
							<Typography variant="subtitle1">Web Developer</Typography>
							<Typography variant="subtitle1">SA Mpumalanga,Nelspruit 1203.</Typography>
						</Grid>
					</Grid>
				</Box>
				{/* Tabs Goes Reference Here */}
				<Tabs
					value={value}
					centered
					onChange={(event, value) => {
						setValue(value);
					}}
					TabIndicatorProps={{
						style: {
							transform: "translateY(-70px)",
							backgroundColor: "#262626",
						},
					}}
				>
					<Tab label="Posts" value="Posts" icon={<Icon>grid_on_outlined</Icon>} />
					<Tab label="IGTV" value="IGTV" icon={<Icon>live_tv</Icon>} disabled />
					<Tab label="Saved" value="Saved" icon={<Icon>bookmark_border_outlined</Icon>} />
					<Tab
						label="Tagged"
						value="Tagged"
						icon={<Icon>local_offer_outlined</Icon>}
						disabled
					/>
				</Tabs>
				{/* Tabs Data Goes Here */}
				<TabPanel value={value} index="Posts">
					<Grid container spacing={2}>
						{data.map((item) => (
							<Grid item xs={4} key={item.id} className={classes.posts}>
								<img
									className={classes.posts_img}
									alt="post"
									src={`data:${item.photoType};base64,${item.photo}`}
								/>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index="Saved">
					<GridList cellHeight={230} cols={3} spacing={15}>
						{bookmarks.map((item) => (
							<GridListTile key={item._id}>
								<img
									src={`data:${item.PhotoType};base64,${item.Photo}`}
									alt={item.Title}
								/>
								<GridListTileBar
									title={item.Title}
									subtitle={<span>By : {item.PostedBy.Name}</span>}
									actionIcon={
										<IconButton
											aria-label={`info about`}
											className={classes.icon}
										>
											<DeleteIcon />
										</IconButton>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</TabPanel>
			</Box>
			{/* EditProfile Dialog */}
			<Dialog onClose={handleEditClose} open={openEdit} className={classes.dialogContainer}>
				<DialogTitle disableTypography className={classes.dialogTitle}>
					<Typography variant="h6">Profile settings</Typography>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleEditClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<VerticalTabs />
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleEditClose} color="primary">
						Save changes
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default ProfilePage;
