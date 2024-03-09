import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
const URL = import.meta.env.VITE_SERVER_URL;

export const ProductCard = ({ product }) => {
	const { addToCart } = useOrder();

	return (
		<>
			<div className="div-card">
				<div className="card-img-container">
					{product.image ? (
						<img
							src={`${URL}/images/products/${product.image}`}
							alt={product.name}
							className="card-img"
						/>
					) : (
						<img
							src={`${URL}/images/products/picture-default.png`}
							alt="Imagen de producto por defecto"
						/>
					)}
				</div>
				<hr className="div-separation" />
				<div className="card-txt-container">
					<h3 className="card-phone">{product.name}</h3>
					<p className="card-description">{product.description}</p>
					<div className="card-price">
						<strong>${product.price}</strong>
					</div>
				</div>
				<div className="card-other-options">
					<Link className="card-info" to={`/product-detail/${product._id}`}>
						VER MÁS
					</Link>
					<div
						className="card-buy btn-buy"
						id="btn-buy"
						onClick={() => addToCart(product)}
					>
						COMPRAR
					</div>
				</div>
			</div>
		</>
	);
};
