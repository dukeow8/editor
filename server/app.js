
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const compression = require("compression");
const helmet = require("helmet");


// access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();


// Create the Express application object
const app = express();

// Compress the HTTP response sent back to a client
app.use(compression()); //Compress all routes

// Use Helmet to protect against well known vulnerabilities
app.use(helmet());

// use Morgan dep in dev mode
app.use(morgan("dev"));

// Set up cors to allow us to accept requests from our client
app.use(
	cors({
		origin: "http://localhost:3000", // <-- location of the react app were connecting to
		credentials: true,
	})
);

// Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

require("./routes/auth.route")(app);
require("./routes/post.route")(app);
require("./routes/user.route")(app);

// db config
const db = require('./config/keys').mongoURI;

//connect mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log (err));

  const port =process.env.PORT || 5000;

  app.listen(port, () => console.log (`Server started on port ${port}`));