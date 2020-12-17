import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav>
			<Link to="/signup">
				<h2>signup</h2>
			</Link>
			<Link to="/login">
				<h2>login</h2>
			</Link>
		</nav>
	);
};
export default Nav;
