import React, { useEffect, useState } from "react";
import { GlobalCtx } from "../App";

const Dashboard = (props) => {
	const { globalState, setGlobalState } = React.useContext(GlobalCtx);
	const { url, token } = globalState;
	const [packages, setPackages] = useState(null);
	const [company, setCompany] = useState("");
	const [value, setValue] = useState("");
	const [dayPolicy, setDayPolicy] = useState("");

	const blank = "";

	const [formData, setFormData] = useState(blank);

	const getPackages = async () => {
		const response = await fetch(`${url}/package/`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		setPackages(data);
	};
	useEffect(() => {
		getPackages();
	}, []);

	// const handleChange = (event) => {
	// 	setFormData({
	// 		...formData,
	// 		[event.target.name]: event.target.value,
	// 	});
	// 	console.log(formData);
	// };

	const handleCompanyChange = (event) => {
		setCompany(event.target.value);
	};
	const handleValueChange = (event) => {
		setValue(event.target.value);
	};
	const handleDayPolicyChange = (event) => {
		setDayPolicy(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(`${url}/package`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ company, value, dayPolicy }),
		})
			.then((response) => response.json())
			.then((data) => {
				setCompany("");
				setValue("");
				setDayPolicy("");
				getPackages();
				// setFormData(blank);
				// setCompany(blank);
				// setValue(blank);
				// setDayPolicy(blank);
			});
	};
	return (
		<div>
			<h1>dashboard</h1>
			<h2>add package</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={company}
					name="company"
					onChange={handleCompanyChange}
				/>
				<input
					type="text"
					value={value}
					name="value"
					onChange={handleValueChange}
				/>
				<input
					type="text"
					value={dayPolicy}
					name="dayPolicy"
					onChange={handleDayPolicyChange}
				/>
				<input type="submit" value="submit" />
			</form>
			<h2>packages</h2>
			<ul>
				{packages
					? packages.map((package_item) => (
							<li key={package_item._id}>
								{package_item.company}
							</li>
					  ))
					: null}
			</ul>
		</div>
	);
};

export default Dashboard;
