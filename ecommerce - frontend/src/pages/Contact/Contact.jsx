import "./Contact.css";

export default function Contact() {
	return (
		<div className="contact">
			<h1 className="title-contact">Contacto</h1>
			<div className="contact-container">
				<form className="contact-form">
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
				</form>
				<div className="contact-adress">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26305.455762422447!2d-58.5197282282959!3d-34.49827072088693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb1b80743cc81%3A0xa22b25f8430707bc!2sUnicenter!5e0!3m2!1ses-419!2sar!4v1694437324994!5m2!1ses-419!2sar"></iframe>
				</div>
			</div>
		</div>
	);
}
