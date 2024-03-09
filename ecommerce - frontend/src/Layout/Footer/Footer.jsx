import { NavLink } from "react-router-dom";
import "./Footer.css";
const URL = import.meta.env.VITE_SERVER_URL;

export default function Footer() {
	return (
		<footer className="footer">
			<section className="footer-section">
				<div className="footer-column">
					<NavLink to="" className="footer-item">
						<i className="fa-brands fa-facebook"></i>Facebook
					</NavLink>
					<NavLink to="" className="footer-item">
						<i className="fa-brands fa-twitter"></i>Twitter
					</NavLink>
					<NavLink to="" className="footer-item">
						<i className="fa-brands fa-instagram"></i>Instagram
					</NavLink>
				</div>
			</section>
			<section className="footer-section">
				<div className="footer-column" id="footer-title">
					<img
						src={`${URL}/images/logo/logo-ecommerce.png`}
						alt="logo"
						className="logo-ecommerce"
					/>
					<h2>MYPHONE</h2>
				</div>
			</section>
			<section className="footer-section">
				<div className="footer-column">
					<NavLink to="" className="footer-item">
						<i className="fa-solid fa-envelope"></i>Correo
					</NavLink>
					<NavLink to="" className="footer-item">
						<i className="fa-solid fa-phone"></i>Teléfono
					</NavLink>
					<NavLink to="" className="footer-item">
						<i className="fa-solid fa-location-dot"></i>Dirección
					</NavLink>
				</div>
			</section>
		</footer>
	);
}
