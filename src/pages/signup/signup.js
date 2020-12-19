import React, { useState } from "react";
import { GlobalCtx } from "../../App";

const Signup = (props) => {
	const { globalState, setGlobalState } = React.useContext(GlobalCtx);

	const { url } = globalState;

	const blank = {
		username: "",
		password: "",
		subscription: "",
	};

	const [formData, setFormData] = useState(blank);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { username, password, subscription } = formData;

		fetch(`${url}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password, subscription }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFormData(blank);
				props.history.push("/login");
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

				{/* <input
					type="text"
					name="subscription"
					value={formData.subscription}
					onChange={handleChange}
				/> */}
				<div>
					<div>
						<img
							src="https://res.cloudinary.com/dusr8fbuo/image/upload/v1608363604/BASIC_ksjpkt.png"
							alt=""
							style={{ height: "12em" }}
						/>
					</div>
					<div>
						<img
							src="https://res.cloudinary.com/dusr8fbuo/image/upload/v1608363600/PRO_try6gn.png"
							alt=""
							style={{ height: "12em" }}
						/>
					</div>
				</div>
				<input type="submit" value="signup" />
			</form>
		</div>
	);
};
export default Signup;
