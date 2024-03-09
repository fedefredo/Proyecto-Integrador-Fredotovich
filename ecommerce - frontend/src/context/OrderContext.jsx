import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import Swal from "sweetalert2";
import axios from "axios";
const URL = import.meta.env.VITE_SERVER_URL;

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const { user } = useUser();
	const [order, setOrder] = useState(
		() => JSON.parse(localStorage.getItem("order")) || [],
	);
	const [cartMenu, setCartMenu] = useState(false);
	const [total, setTotal] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		calculateTotalItems();
		calculateTotal();
	}, [order]);

	function addToCart(item) {
		let newOrder;

		if (order.findIndex((prod) => prod.productId === item._id) >= 0) {
			newOrder = order.map((producto) => {
				if (producto.productId === item._id) {
					return { ...producto, quantity: producto.quantity + 1 };
				}

				return producto;
			});
		} else {
			const product = {
				productId: item._id,
				quantity: 1,
				price: item.price,
				productName: item.name,
				image: item.image,
				color: item.color,
			};
			newOrder = [...order, product];
		}

		localStorage.setItem("order", JSON.stringify(newOrder));

		setOrder(newOrder);
	}

	function calculateTotalItems() {
		const totales = order.reduce((total, producto) => {
			total += producto.quantity;
			return total;
		}, 0);

		setTotalItems(totales);
	}

	function calculateTotal() {
		const totalAcc = order.reduce((acc, producto) => {
			acc += producto.price * producto.quantity;
			return acc;
		}, 0);

		setTotal(totalAcc);
	}

	async function finishOrder() {
		try {
			if (!user) {
				return Swal.fire({
					icon: "error",
					title: "Oops",
					text: "Debes iniciar sesión para agregar productos al carrito",
				});
			}

			const newOrder = {
				userId: user._id,
				total,
				products: order,
			};

			const response = await axios.post(`${URL}/orders`, newOrder, {
				headers: {
					authorization: localStorage.getItem("token"),
				},
			});

			Swal.fire({
				title: "Compra realizada",
				text: "Gracias por su compra",
				icon: "success",
			});

			clearCart();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops, algo salio mal",
			});
		}
	}

	function removeItem(item) {
		const orderUpdated = order.filter(
			(prod) => prod.productId !== item.productId,
		);

		localStorage.setItem("order", JSON.stringify(orderUpdated));
		setOrder(orderUpdated);
	}

	function clearCart() {
		setOrder([]);
	}

	function toggleMenu() {
		setCartMenu(!cartMenu);
	}

	function decrementQuantity(item) {
		let newOrder = order.map((prod) => {
			if (prod.productId === item.productId) {
				return { ...prod, quantity: prod.quantity - 1 };
			}
			return prod;
		});

		localStorage.setItem("order", JSON.stringify(newOrder));

		setOrder(newOrder);
	}

	function incrementQuantity(item) {
		let newOrder = order.map((prod) => {
			if (prod.productId === item.productId) {
				return { ...prod, quantity: prod.quantity + 1 };
			}
			return prod;
		});

		localStorage.setItem("order", JSON.stringify(newOrder));

		setOrder(newOrder);
	}

	return (
		<OrderContext.Provider
			value={{
				order,
				addToCart,
				removeItem,
				clearCart,
				toggleMenu,
				cartMenu,
				total,
				totalItems,
				finishOrder,
				decrementQuantity,
				incrementQuantity,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
