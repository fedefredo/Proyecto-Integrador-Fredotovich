import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductCardsContainer.css";

const URL = import.meta.env.VITE_SERVER_URL;

export const ProductCardsContainer = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	async function getProducts() {
		try {
			const response = await axios.get(`${URL}/products`);

			setProducts(response.data.products);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;
			if (!search) getProducts();

			if (search.length <= 3) return;

			const response = await axios.get(`${URL}/products/search/${search}`);

			const products = response.data.products;

			setProducts(products);
		} catch (error) {
			console.log(error);
			return Swal.fire({
				title: "No se encontró ningun producto",
				icon: "error",
			});
		}
	}

	return (
		<>
			<h1 className="title-container">Lista de productos</h1>
			<div className="filter-product">
				<input
					type="text"
					onKeyUp={handleSearch}
					placeholder="Buscar producto"
					className="search-input"
				/>
			</div>
			<div className="products-container">
				{products?.map((product) => {
					return <ProductCard product={product} key={product._id} />;
				})}
			</div>
			<section class="features-section">
				<div class="feature">
					<i class="fa-solid fa-truck"></i>
					Delivery en 24hrs
				</div>
				<div class="feature">
					<i class="fa-solid fa-receipt"></i>
					Garantía de 1 año
				</div>
				<div class="feature">
					<i class="fa-regular fa-credit-card"></i>
					Pagá como quieras
				</div>
			</section>
		</>
	);
};
