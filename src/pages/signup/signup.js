import React, { useState } from "react";
import { GlobalCtx } from "../../App";
require("dotenv").config();

// const BASIC = process.env.REACT_APP_BASIC_PRICE_ID;
// const PRO = process.env.REACT_APP_PRO_PRICE_ID;

const Signup = (props) => {
	const { globalState, setGlobalState } = React.useContext(GlobalCtx);
	const { url } = globalState;
	// const [basicSubscription, setBasicSubscription] = useState("");
	// const [proSubscription, setProSubscription] = useState("");

	const blank = {
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
		subscription: "",
	};

	const [formData, setFormData] = useState(blank);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const {
			username,
			password,
			firstName,
			lastName,
			email,
			subscription,
		} = formData;

		fetch(`${url}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
				firstName,
				lastName,
				email,
				subscription,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFormData(blank);
				props.history.push("/login");
			});
	};

	// var handleFetchResult = function (result) {
	// 	if (!result.ok) {
	// 		return result
	// 			.json()
	// 			.then(function (json) {
	// 				if (json.error && json.error.message) {
	// 					throw new Error(
	// 						result.url +
	// 							" " +
	// 							result.status +
	// 							" " +
	// 							json.error.message
	// 					);
	// 				}
	// 			})
	// 			.catch(function (err) {
	// 				showErrorMessage(err);
	// 				throw err;
	// 			});
	// 	}
	// 	return result.json();
	// };

	const basicPrice = "price_1Hysb2AOzHmZJW0INYWigibP";
	const proPrice = "price_1HysehAOzHmZJW0ICNl84dxX";

	const handleSubscribeBasicClick = (basicPrice) => {
		console.log("test");
		setFormData({
			...formData,
			subscription: "BASIC",
		});
		console.log(formData);
	};

	const handleSubscribeProClick = () => {
		setFormData({
			...formData,
			subscription: "PRO",
		});
		fetch("/create-checkout-session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				priceId: proPrice,
			}),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				stripe
					.redirectToCheckout({
						sessionId: data.sessionId,
					})
					.then(console.log(sessionId));
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>username</label>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
				/>
				<br></br>
				<label>password</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<br></br>
				<label>first name</label>
				<input
					type="text"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
				/>
				<br></br>
				<label>last name</label>
				<input
					type="text"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
				/>
				<br></br>
				<label>email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<br></br>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							margin: "20px",
						}}
						onClick={handleSubscribeBasicClick}
					>
						<img
							src="https://res.cloudinary.com/dusr8fbuo/image/upload/v1608363604/BASIC_ksjpkt.png"
							alt=""
							style={{ height: "11em" }}
						/>
					</div>
					<div
						style={{
							margin: "20px",
						}}
						onClick={handleSubscribeProClick}
					>
						<img
							src="https://res.cloudinary.com/dusr8fbuo/image/upload/v1608363600/PRO_try6gn.png"
							alt=""
							style={{ height: "11em" }}
						/>
					</div>
				</div>
				<input type="submit" value="signup" />
			</form>
		</div>
	);
};
export default Signup;
