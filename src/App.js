import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "../src/components/Nav.js";
import { Switch, Route, Link } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

export const GlobalCtx = React.createContext(null);

function App() {
	const [globalState, setGlobalState] = useState({
		url: "http://localhost:3000",
		token: null,
	});

	//trying to check if user is logged in
	useEffect(() => {
		const token = JSON.parse(window.localStorage.getItem("token"));
		console.log(token);
		if (token) {
			setGlobalState({ ...globalState, token: token });
		}
	}, []);

	return (
		<GlobalCtx.Provider value={{ globalState, setGlobalState }}>
			<div className="App">
				<Nav />
				<main>
					<Switch>
						<Route
							exact
							path="/"
							render={(rp) =>
								// globalState.token ? <Dashboard /> : <Home />
								globalState.token ? <Dashboard /> : <Home />
							}
						/>

						<Route path="/home" render={(rp) => <Home {...rp} />} />
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
							render={(rp) => <Dashboard />}
						/>
					</Switch>
				</main>
			</div>
		</GlobalCtx.Provider>
	);
}

export default App;
