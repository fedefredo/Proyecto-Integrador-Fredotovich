import { useOrder } from "../../context/OrderContext";
import "./Cart.css";
const URL = import.meta.env.VITE_SERVER_URL;

export default function Cart() {
	const {
		cartMenu,
		order,
		total,
		totalItems,
		finishOrder,
		clearCart,
		removeItem,
		decrementQuantity,
		incrementQuantity,
	} = useOrder();

	return (
		<div className={`cart-wrapper ${cartMenu ? "active" : ""}`}>
			<div className="list-container">
				<h2>Orden actual</h2>
				<ul className="order-list">
					{order.map((prod, idx) => {
						return (
							<li key={idx} className="order-item">
								<img
									className="order-image"
									src={`${URL}/images/products/${prod.image}`}
									alt={prod.productName}
								/>
								<div className="order-product-name">{prod.productName}</div>
								<div className="order-quantity">
									<span
										className="quantity-variable"
										onClick={() => decrementQuantity(prod)}
									>
										-
									</span>
									{prod.quantity}
									<span
										className="quantity-variable"
										onClick={() => incrementQuantity(prod)}
									>
										+
									</span>
									<div
										className="order-delete-item"
										onClick={() => removeItem(prod)}
									>
										<i className="fa-solid fa-trash"></i>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className="order-finish">
				<div className="total">
					<div className="total-count">Items: {totalItems}</div>
					<div className="total-price">
						Total: <span className="price">${total}</span>
					</div>
				</div>
				<div className="order-purchase">
					<a className="clear-order" onClick={() => clearCart()}>
						Limpiar carrito
					</a>
					<button className="btn" onClick={() => finishOrder()}>
						Comprar
					</button>
				</div>
			</div>
		</div>
	);
}
