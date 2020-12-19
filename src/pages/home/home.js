import React, { useState } from "react";
import { GlobalCtx } from "../../App";
import "./home.scss";

const Home = (props) => {
	return (
		<div className="main">
			<h1>PACT</h1>
			<h3>Effortless. Friendly. Quick. Easy</h3>
			<h5>
				Create an account and start managing your packages with a PACT
				subscription now.
			</h5>
			<button>signup</button>
		</div>
	);
};
export default Home;
