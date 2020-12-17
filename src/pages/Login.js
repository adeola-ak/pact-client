import React, { useState } from "react";
import { GlobalCtx } from "../App";

const Login = (props) => {
	const { globalState, setGlobalState } = React.useContext(GlobalCtx);

	const { url } = globalState;

	const blank = {
		username: "",
		password: "",
	};

	const [formData, setFormData] = useState(blank);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { username, password } = formData;
		fetch(`${url}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				window.localStorage.setItem("token", JSON.stringify(data));
				setGlobalState({ ...globalState, token: data.token });
				setFormData(blank);
				if (data.token) {
					props.history.push("/dashboard");
				} else {
					console.log("error");
				}
			});
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<input type="submit" value="login" />
			</form>
		</div>
	);
};
export default Login;
