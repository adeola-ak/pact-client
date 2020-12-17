import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";

const Nav = () => {
	const { globalState, setGlobalState } = useContext(GlobalCtx);

	return (
		<nav>
			<Link to="/signup">
				<h2>signup</h2>
			</Link>
			<Link to="/login">
				<h2>login</h2>
			</Link>
			{globalState.token ? (
				<Link to="/">
					<h2
						onClick={() => {
							window.localStorage.removeItem("token");
							setGlobalState({ ...globalState, token: null });
						}}
					>
						Logout
					</h2>
				</Link>
			) : null}
		</nav>
	);
};
export default Nav;
