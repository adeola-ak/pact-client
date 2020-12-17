import React, { useState } from "react";
import "./App.css";
import Nav from "../src/components/Nav.js";
import { Switch, Route, Link } from "react-router-dom";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";

export const GlobalCtx = React.createContext(null);

function App() {
	const [globalState, setGlobalState] = useState({
		url: "http://localhost:3000",
		token: null,
	});

	return (
		<GlobalCtx.Provider value={{ globalState, setGlobalState }}>
			<div className="App">
				<Link to="/">
					<h1>PACT</h1>
				</Link>
				<Nav />
				<main>
					<Switch>
						<Route exact path="/" render={(rp) => <h1>home</h1>} />

						<Route
							path="/signup"
							render={(rp) => <Signup {...rp} />}
						/>

						<Route
							path="/login"
							render={(rp) => <Login {...rp} />}
						/>

						<Route
							path="/dashboard"
							render={(rp) => <h1>dashboard</h1>}
						/>
					</Switch>
				</main>
			</div>
		</GlobalCtx.Provider>
	);
}

export default App;
