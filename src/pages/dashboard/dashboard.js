import React, { useEffect, useState } from "react";
import { GlobalCtx } from "../../App";

const Dashboard = (props) => {
	const { globalState, setGlobalState } = React.useContext(GlobalCtx);
	const { url, token } = globalState;
	const [packages, setPackages] = useState("");
	const [company, setCompany] = useState("");
	const [value, setValue] = useState("");
	const [dayPolicy, setDayPolicy] = useState("");

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
			.then((response) => {
				response.json();
			})

			.then(() => {
				setCompany("");
				setValue("");
				setDayPolicy("");
				getPackages();
			});
	};

	//   const handleUpdate = () => {
	// 		console.log(input);
	// 		const note = update.current.value;
	// 		fetch(url + "/note/" + updateID, {
	// 			method: "put",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `bearer ` + token,
	// 			},
	// 			body: JSON.stringify({ note }),
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				update.current.value = "";
	// 				setUpdateID(null);
	// 				getNotes();
	// 			});
	//   };

	const handleDelete = (id) => {
		fetch(`${url}/package/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				getPackages();
			});
	};

	const handleUpdate = () => {};

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
				{packages !== null ? (
					packages.map((item) => {
						return (
							<li key={item._id}>
								<h3>{item.company}</h3>
								<h4>{item.value}</h4>
								<h5>{item.dayPolicy}</h5>
								<button>edit</button>
								<button onClick={() => handleDelete(item._id)}>
									delete
								</button>
							</li>
						);
					})
				) : (
					<h1>loading</h1>
				)}
			</ul>
		</div>
	);
};

export default Dashboard;
