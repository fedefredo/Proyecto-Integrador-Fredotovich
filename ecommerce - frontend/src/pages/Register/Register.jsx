import { NavLink } from "react-router-dom";
import "./Register.css";

export default function Register() {
	return (
		<div className="register-container">
			<form action="" className="register-form">
				<h1>Register</h1>
				<div className="form-data">
					<label htmlFor="inputNombre">Nombre Completo</label>
					<input
						className="group"
						type="text"
						value=""
						name="nombreCompleto"
						id="inputNombre"
						placeholder="Jhon Doe"
						minLength="3"
						maxLength="60"
					/>
				</div>
				<div className="form-data">
					<label htmlFor="inputCorreo">Correo Electrónico</label>
					<input
						className="group"
						type="email"
						value=""
						name="correoElectronico"
						id="inputCorreo"
						placeholder="JhonDoe@gmail.com"
						title="Por favor ingresa una dirección de correo electrónico válida."
					/>
				</div>
				<div className="form-data">
					<label htmlFor="inputContrasena">Contraseña</label>
					<input
						className="group"
						type="password"
						value=""
						name="contraseña"
						id="inputContrasena"
						placeholder="******"
						minLength="8"
						title="La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial."
						maxLength="20"
					/>
				</div>
				<div className="form-data">
					<label htmlFor="inputRcontrasena">Repetir Contraseña</label>
					<input
						className="group"
						type="password"
						value=""
						name="contraseña2"
						id="inputRcontrasena"
						placeholder="******"
						title="ingresa la misma contraseña nuevamente."
					/>
				</div>
				<div className="form-data">
					<label htmlFor="inputNacimiento">Fecha de Nacimiento</label>
					<input
						className="group"
						type="date"
						value=""
						name="fechaDeNacimiento"
						id="inputNacimiento"
						placeholder="dd/mm/aaaa"
						min="1950-01-01"
						title="Seleccione su fecha de Nacimiento"
					/>
				</div>
				<div className="form-data">
					<label htmlFor="inputProvincia">Seleccione su Provincia</label>
					<select className="group" name="provincia" id="inputProvincia">
						<option value="Buenos Aires" selected>
							Buenos Aires
						</option>
						<option value="Buenos Aires">Buenos Aires</option>
						<option value="Catamarca">Catamarca</option>
						<option value="Chaco">Chaco</option>
						<option value="Chubut">Chubut</option>
						<option value="Cordoba">Cordoba</option>
						<option value="Corrientes">Corrientes</option>
						<option value="Entre Rios">Entre Rios</option>
						<option value="Formosa">Formosa</option>
						<option value="Jujuy">Jujuy</option>
						<option value="La Pampa">La Pampa</option>
						<option value="La Rioja">La Rioja</option>
						<option value="Mendoza">Mendoza</option>
						<option value="Misiones">Misiones</option>
						<option value="Neuquen">Neuquen</option>
						<option value="Rio Negro">Rio Negro</option>
						<option value="Salta">Salta</option>
						<option value="San Juan">San Juan</option>
						<option value="San Luis">San Luis</option>
						<option value="Santa Cruz">Santa Cruz</option>
						<option value="Santa Fe">Santa Fe</option>
						<option value="Santiago del Estero">Santiago del Estero</option>
						<option value="Tierra del Fuego">Tierra del Fuego</option>
						<option value="Tucuman">Tucuman</option>
					</select>
				</div>
				<div className="form-data">
					<label htmlFor="Observaciones">Observaciones</label>
					<textarea
						className="group"
						name="Observaciones"
						id="Observaciones"
						cols="10"
						rows="5"
						placeholder="Escriba sus observaciones aquí"
					></textarea>
				</div>
				<div className="form-data">
					<button type="submit" className="button">
						Registrarse
					</button>
				</div>
				<div className="form-data">
					<p>
						¿Ya tienes una cuenta? Haga clic <NavLink to="/login">aquí</NavLink>{" "}
						para iniciar sesión.
					</p>
				</div>
			</form>
		</div>
	);
}
