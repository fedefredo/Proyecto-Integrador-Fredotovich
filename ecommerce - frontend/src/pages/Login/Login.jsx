import { useUser } from "../../context/UserContext";
import "./Login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
	const { login } = useUser();

	function handleSubmit(event) {
		event.preventDefault();
		const el = event.target.elements;

		const data = {
			email: el.email.value,
			password: el.password.value,
		};

		login(data);
	}

	return (
		<div className="login-container">
			<form action="" className="login-form" onSubmit={handleSubmit}>
				<h1>Ingresar</h1>
				<div className="form-data">
					<input name="email" type="text" placeholder="Correo Electrónico" />
				</div>
				<div className="form-data">
					<input name="password" type="password" placeholder="Contraseña" />
				</div>
				<div className="form-data">
					<button type="submit" className="button">
						Ingresar
					</button>
				</div>
				<div className="form-data">
					<p>
						¿No tiene una cuenta? Haga clic{" "}
						<NavLink to="/register">aquí</NavLink> para registrarse.
					</p>
				</div>
			</form>
		</div>
	);
}
