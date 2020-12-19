import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Nav.scss";

const Nav = (props) => {
	const { globalState, setGlobalState } = useContext(GlobalCtx);
	// This is for managing onClick
	const [width, setWidth] = React.useState(
		window.innerWidth > 0 ? window.innerWidth : Screen.width
	);
	window.addEventListener("resize", function () {
		setWidth(window.innerWidth);
	});
	React.useEffect(() => {
		let nav = document.getElementById("linksList");
		// leaving it like this just in case we want to mess with this later
		if (width > 768) {
			nav.style.display = "none";
		} else {
			nav.style.display = "none";
		}
	}, [width]);

	const handleClickBars = () => {
		if (width < 769) {
			let nav = document.getElementById("linksList");
			if (nav.style.display === "flex") {
				nav.style.display = "none";
			} else {
				nav.style.display = "flex";
			}
		}
	};
	const handleClick = () => {
		if (width < 769) {
			let nav = document.getElementById("linksList");
			nav.style.display = "none";
		}
	};

	const logout = () => {
		window.localStorage.removeItem("token");
		setGlobalState({ ...globalState, token: null });
		handleClick();
	};

	return (
		<div className="header-container">
			<header className="header">
				<Link className="appTitle" to="/" onClick={handleClick}>
					<div>PACT</div>
				</Link>
				<div className="navIcon" onClick={handleClickBars}>
					<FontAwesomeIcon className="appTitle" icon={faBars} />
				</div>
				<div>
					<Link
						className="desktopList"
						to="/about"
						onClick={handleClick}
					>
						About
					</Link>
					<Link
						className="desktopList"
						to="/login"
						onClick={handleClick}
					>
						Login
					</Link>
					<Link
						className="desktopList"
						to="/signup"
						onClick={handleClick}
					>
						Signup
					</Link>
					{globalState.token ? (
						<Link
							className="desktopList"
							to="/home"
							onClick={logout}
						>
							Logout
						</Link>
					) : null}
				</div>
			</header>
			<nav id="linksList">
				<ul id="mobileNav">
					<li>
						<Link
							className="mobileList"
							to="/about"
							onClick={handleClick}
						>
							About
						</Link>
					</li>

					<li>
						<Link
							className="mobileList"
							to="/login"
							onClick={handleClick}
						>
							Login
						</Link>
					</li>

					<li>
						<Link
							className="mobileList"
							to="/signup"
							onClick={handleClick}
						>
							Signup
						</Link>
					</li>

					{globalState.token ? (
						<li>
							<Link
								className="mobileList"
								to="/home"
								onClick={logout}
							>
								Logout
							</Link>
						</li>
					) : null}
				</ul>
			</nav>
		</div>
	);
};
export default Nav;
