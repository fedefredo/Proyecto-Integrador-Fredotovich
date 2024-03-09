import { createContext, useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_SERVER_URL;

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(
		() => JSON.parse(localStorage.getItem("currentUser")) || null,
	);
	const [admin, setAdmin] = useState(
		() =>
			JSON.parse(localStorage.getItem("currentUser"))?.role === "ADMIN_ROLE",
	);
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const navigate = useNavigate();

	async function login(data) {
		try {
			const response = await axios.post(`${URL}/login`, data);

			const { token, user } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("currentUser", JSON.stringify(user));

			setUser(user);
			setToken(token);
			setAdmin(user.role === "ADMIN_ROLE");

			Swal.fire({
				title: "Login correcto",
				text: "Será redireccionado en breve",
				icon: "success",
				timer: 1500,
			}).then(() => {
				navigate("/");
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Error al ingresar",
				text: "Alguno de los datos ingresados no es correcto",
				icon: "error",
			});
		}
	}

	function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("currentUser");
		setUser(null);
		setToken(null);
		setAdmin(false);
		navigate("/");
	}

	return (
		<UserContext.Provider value={{ user, admin, login, logout, token }}>
			{children}
		</UserContext.Provider>
	);
};
