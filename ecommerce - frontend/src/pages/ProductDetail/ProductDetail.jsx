import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { useOrder } from "../../context/OrderContext";
const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const { addToCart } = useOrder();

	useEffect(() => {
		getProductDetail(id);
	}, [id]);

	async function getProductDetail(id) {
		try {
			const response = await axios.get(`${URL}/products/${id}`);

			setProduct(response.data.product);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="product-container">
			<div className="product-img-container">
				<img
					src={product.image ? `${URL}/images/products/${product.image}` : ""}
					alt={product.name}
					className="product-img"
				/>
			</div>
			<div className="product-body">
				<h1 className="product-name">{product.name}</h1>
				<p className="product-description">{product.description}</p>
				<div className="product-especifications">
					<p className="product-data-title">Especificaciones Técnicas</p>
					<p className="product-data">Procesador: {product.procesador}</p>
					<p className="product-data">Peso: {product.peso}</p>
					<p className="product-data">Pantalla: {product.pantalla}</p>
					<p className="product-data">Batería: {product.batería}</p>
				</div>
				<div>
					<div className="product-price">${product.price}</div>
					<div>{product.quantity}</div>
				</div>
				<div className="cart-btn-container">
					<button className="cart-btn" onClick={() => addToCart(product)}>
						Añadir al carrito
					</button>
				</div>
			</div>
		</div>
	);
}
