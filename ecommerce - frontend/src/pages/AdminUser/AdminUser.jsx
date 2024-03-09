import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserTable } from "../../components/UserTable/UserTable";
import { useUser } from "../../context/UserContext";
const URL = import.meta.env.VITE_SERVER_URL;

export default function AdminUser() {
	const { token, logout } = useUser();
	const [dbUsers, setDbUsers] = useState([]);
	const [userId, setUserId] = useState();
	const [limit, setLimit] = useState(2);
	const [totalButtons, setTotalButtons] = useState([]);

	async function getUsers(page = 0) {
		try {
			const response = await axios.get(
				`${URL}/users?page=${page}&limit=${limit}`,
			);
			const users = response.data.users;
			const total = response.data.total;

			const buttonsQuantity = Math.ceil(total / limit);
			const arrayButtons = [];

			for (let i = 0; i < buttonsQuantity; i++) {
				arrayButtons.push(i);
			}

			setTotalButtons(arrayButtons);
			setDbUsers(users);
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "No se pudieron obtener los usuarios",
				icon: "error",
			});
		}
	}

	async function deleteUser(id) {
		Swal.fire({
			title: "Confirma borrar este usuario",
			text: `Realmente desea borrar el usuario ${id}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Borrar",
			cancelButtonText: "Cancelar",
			confirmButtonColor: "#d33",
			reverseButtons: true,
		}).then(async function (resultado) {
			if (resultado.isConfirmed) {
				try {
					if (!token) return;

					const response = await axios.delete(`${URL}/users/${id}`, {
						headers: {
							authorization: token,
						},
					});

					Swal.fire({
						title: "Usuario borrado",
						text: `El user ${id} fue borrado correctamente`,
						icon: "success",
						timer: 1500,
					});

					getUsers();
				} catch (error) {
					console.log(error);
					Swal.fire("Error al borrar", "No se pudo borrar el usuario");
					if (error.response.status === 401) return logout();
				}
			}
		});
	}

	useEffect(() => {
		getUsers();
	}, [limit]);

	const { register, handleSubmit, setValue } = useForm();

	async function submittedData(data) {
		try {
			const formData = new FormData();

			formData.append("name", data.name);
			formData.append("email", data.email);
			formData.append("password", data.password);
			formData.append("age", data.age);
			formData.append("bornDate", data.bornDate);
			formData.append("role", data.role);

			if (
				data.image &&
				data.image.length > 0 &&
				data.image[0] instanceof File
			) {
				formData.append("image", data.image[0]);
			}

			if (userId) {
				if (!token) return;
				console.log(userId);
				const response = await axios.put(`${URL}/users/${userId}`, formData, {
					headers: {
						authorization: token,
					},
				});
				Swal.fire({
					title: "Usuario Editado correctamente",
					text: `El usuario ${response.data.user?.name} fue editado correctamente`,
					icon: "success",
				});
				getUsers();
				setUserId(null);
				setFormValue(null);
				return;
			}

			const response = await axios.post(`${URL}/users`, formData);
			Swal.fire({
				title: "Usuario Creado",
				text: `El usuario ${response.data.user?.name} fue creado correctamente`,
				icon: "success",
			});
			getUsers();
			setFormValue();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo el usuario",
				text: "Alguno de los datos ingresados no es correcto",
			});
			if (error.response.status === 401) return logout();
		}
	}

	function setFormValue(user) {
		setUserId(user?._id || "");

		setValue("name", user?.name || "");
		setValue("email", user?.email || "");
		setValue("age", user?.age || "");
		setValue("image", user?.image || "");
		setValue("bornDate", user?.bornDate || "");
		setValue("role", user?.role || "");
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;

			if (!search) getUsers();

			if (search.length <= 3) return;

			const response = await axios.get(`${URL}/users/search/${search}`);

			const users = response.data.users;

			setDbUsers(users);
		} catch (error) {
			console.log(error);
			return Swal.fire({
				title: "No se encontró el usuario",
				icon: "error",
			});
		}
	}

	return (
		<>
			<h1 className="title-admin">ADMIN USERS</h1>
			<div className="admin-dashboard">
				<div className="form-container">
					<div className="form-sticky">
						<h2 className="admin-form-title"></h2>
						<form
							className="admin-form"
							onSubmit={handleSubmit(submittedData)}
							encType="multipart/form-data"
						>
							{userId && (
								<button
									className="btn btn-delete btn-cancel"
									onClick={() => setFormValue()}
								>
									<i className="fa-solid fa-xmark"></i>
								</button>
							)}
							<div className="form-info">
								<label htmlFor="name">Nombre Completo</label>
								<input
									type="text"
									id="name"
									className="admin-input"
									{...register("name")}
									placeholder="Nombre Completo"
									name="name"
								/>
							</div>
							<div className="form-info">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									className="admin-input"
									{...register("email")}
									placeholder="Email"
									name="email"
									id="email"
								/>
							</div>
							<div className="form-info">
								<label htmlFor="password">Contraseña</label>
								<input
									type="password"
									className="admin-input"
									{...register("password")}
									disabled={userId}
									placeholder="Contraseña"
									name="password"
									id="password"
								/>
							</div>
							<div className="form-info">
								<label htmlFor="bornDate">Fecha de nacimiento</label>
								<input
									type="date"
									{...register("bornDate")}
									placeholder="Fecha de nacimiento"
									id="bornDate"
									name="bornDate"
								/>
							</div>
							<div className="form-info">
								<label htmlFor="image">Imagen</label>
								<input
									type="file"
									accept="image/*"
									className="admin-input"
									{...register("image")}
									placeholder="Imagen"
									id="image"
									name="image"
								/>
							</div>
							<div className="form-info">
								<label htmlFor="role">Rol</label>
								<select name="role" id="role" {...register("role")}>
									<option selected={true} disabled>
										Seleccione un rol
									</option>
									<option value="ADMIN_ROLE">ADMIN_ROLE</option>
									<option value="CLIENT_ROLE">CLIENT_ROLE</option>
									<option value="USER_ROLE">USER_ROLE</option>
								</select>
							</div>
							<div className="form-submit">
								<button type="submit" className={userId ? "btn-success" : ""}>
									{userId ? "Editar Usuario" : "Añadir Usuario"}
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="container">
					<div className="flex-between">
						<h2 className="title-products">Tabla de usuarios</h2>
						<div className="search-product">
							<input
								type="text"
								onKeyUp={handleSearch}
								placeholder="Buscar usuario"
							/>
						</div>
					</div>
					<UserTable
						users={dbUsers}
						deleteUser={deleteUser}
						setFormValue={setFormValue}
					/>
					<div className="pagination-container">
						{totalButtons.map((btn) => (
							<button
								key={btn}
								onClick={() => getUsers(btn)}
								className="pagination-btn"
							>
								{btn + 1}
							</button>
						))}
					</div>
					<div>
						<select onChange={(e) => setLimit(e.target.value)}>
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
						</select>
					</div>
				</div>
			</div>
		</>
	);
}
