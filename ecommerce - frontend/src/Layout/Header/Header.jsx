import { NavLink } from "react-router-dom";
import "./Header.css";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
const URL = import.meta.env.VITE_SERVER_URL;

export default function Header() {
	const { toggleMenu, totalItems } = useOrder();
	const { user, logout, admin } = useUser();

	return (
		<header className="main-header">
			<NavLink to="/" className="nav-logo-link">
				<img
					src={`${URL}/images/logo/logo-ecommerce.png`}
					alt="Logo"
					className="nav-logo"
				/>
			</NavLink>

			<div className="user-info" id="header-user">
				{user ? (
					<>
						<div className="icon-container">
							<i
								data-count={totalItems}
								className="cart-icon fa-solid fa-cart-shopping"
								onClick={() => toggleMenu()}
							></i>
						</div>
						<div className="dropdown-menu user-avatar">
							<img
								src={`${URL}/images/users/${user.image}`}
								alt={user.name}
								className="user-img"
							/>
							<div className="user-data">
								<div className="user-profile">
									<img
										src={`${URL}/images/users/${user.image}`}
										alt={user.name}
										className="user-profile-img"
									/>
									{user.name}
								</div>
								<hr />
								<div className="user-action">
									<i className="fa-solid fa-arrow-right-from-bracket"></i>
									<NavLink
										to="/"
										className="logout-btn"
										onClick={() => logout()}
									>
										Cerrar sesión
									</NavLink>
								</div>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="icon-container">
							<i
								data-count={totalItems}
								className="cart-icon fa-solid fa-cart-shopping"
								onClick={() => toggleMenu()}
							></i>
						</div>
						<NavLink to="/login">
							<div className="user-logo">
								<i className="fa-solid fa-user logo"></i>
							</div>
						</NavLink>
					</>
				)}
			</div>

			<input className="input-check" type="checkbox" id="check-menu" />
			<label className="burger-menu" htmlFor="check-menu">
				<span className="burger-line"></span>
			</label>

			<nav className="main-nav">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? "nav-link active" : "nav-link"
					}
				>
					Principal
				</NavLink>
				<NavLink to="/contact" className="nav-link">
					Contacto
				</NavLink>
				<NavLink to="about-us" className="nav-link">
					Acerca de
				</NavLink>
				{admin && (
					<>
						<NavLink to="/admin-product" className="nav-link">
							Admin Product
						</NavLink>
						<NavLink to="/admin-user" className="nav-link">
							Admin User
						</NavLink>
					</>
				)}
			</nav>
		</header>
	);
}
