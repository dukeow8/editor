//import react modules
import React from "react";
import AuthentificationState from "./contexts/auth/Auth.state";
import Routing from "./routes/Routing";
import "./App.css";

//app function
const App = () => {
	return (
		<AuthentificationState>
			<Routing />
		</AuthentificationState>
	);
};

export default App;
