import formatDate from "../../utils/formatDate";
const URL = import.meta.env.VITE_SERVER_URL;

export const UserTable = ({ users, deleteUser, setFormValue }) => {
	return (
		<div className="table-container">
			<table className="table">
				<thead>
					<tr className="table-head">
						<th>Imagen</th>
						<th>Nombre Completo</th>
						<th>Email</th>
						<th>Fecha de nacimiento</th>
						<th>Rol</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{users.map((usr) => (
						<tr key={usr._id}>
							<td>
								<img
									className="user-table-img"
									src={
										usr.image
											? `${URL}/images/users/${usr.image}`
											: `${URL}/images/users/picture-default.jpg`
									}
									alt={`${usr.name} profile picture`}
								/>
							</td>
							<td className="table-name">{usr.name}</td>
							<td className="table-email">{usr.email}</td>
							<td className="table-borndate">{formatDate(usr.bornDate)}</td>
							<td className="table-role">{usr.role}</td>
							<td className="table-actions">
								<button
									className="btn btn-delete"
									onClick={() => deleteUser(usr._id)}
								>
									<i className="fa-solid fa-trash"></i>
								</button>
								<button
									className="btn btn-edit"
									onClick={() => setFormValue(usr)}
								>
									<i className="fa-solid fa-pencil"></i>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
