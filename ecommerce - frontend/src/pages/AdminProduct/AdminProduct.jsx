import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { ProductTable } from "../../components/ProductTable/ProductTable";
import { useUser } from "../../context/UserContext";
const URL = import.meta.env.VITE_SERVER_URL;

export default function AdminProduct() {
	const { token, logout } = useUser();
	const [dbProducts, setDbProducts] = useState([]);
	const [productId, setProductId] = useState();
	const [categories, setCategories] = useState([]);

	async function getProducts() {
		try {
			const response = await axios.get(`${URL}/products`);
			const products = response.data.products;

			setDbProducts(products);
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "No se pudieron obtener los productos",
				icon: "error",
			});
		}
	}

	async function deleteProduct(id) {
		Swal.fire({
			title: "Confirma borrar este producto",
			text: `Realmente desea borrar el producto ${id}`,
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

					const response = await axios.delete(`${URL}/products/${id}`, {
						headers: {
							authorization: token,
						},
					});

					Swal.fire({
						title: "Producto borrado",
						text: `El producto ${id} fue borrado correctamente`,
						icon: "success",
						timer: 1500,
					});

					getProducts();
				} catch (error) {
					console.log(error);
					Swal.fire("Error al borrar", "No se pudo borrar el producto");
					if (error.response.status === 401) return logout();
				}
			}
		});
	}

	useEffect(() => {
		getProducts();
		getCategories();
	}, []);

	async function getCategories() {
		try {
			const response = await axios.get(`${URL}/categories`);

			const categoriesDB = response.data.categories;

			setCategories(categoriesDB);
		} catch (error) {
			console.log(error);
		}
	}

	async function submittedData(data) {
		try {
			const formData = new FormData();

			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("price", data.price);
			formData.append("category", data.category);
			formData.append("active", data.active);

			if (
				data.image &&
				data.image.length > 0 &&
				data.image[0] instanceof File
			) {
				formData.append("image", data.image[0]);
			}

			if (productId) {
				if (!token) return;
				const response = await axios.put(
					`${URL}/products/${productId}`,
					formData,
					{
						headers: {
							authorization: token,
						},
					},
				);
				Swal.fire({
					title: "Producto Editado correctamente",
					text: `El producto ${response.data.product.name} fue editado correctamente`,
					icon: "success",
				});

				getProducts();
				setProductId(null);
				setFormValue(null);

				return;
			}

			const response = await axios.post(`${URL}/products`, formData);
			Swal.fire({
				title: "Producto Creado",
				text: `El producto ${response.data.product?.name} fue creado correctamente`,
				icon: "success",
			});
			getProducts();
			setFormValue();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo el producto",
				text: "Alguno de los datos ingresados no es correcto",
			});
			if (error.response.status === 401) return logout();
		}
	}

	const { register, handleSubmit, setValue } = useForm();

	function setFormValue(product) {
		setProductId(product?._id || "");

		setValue("name", product?.name || "");
		setValue("description", product?.description || "");
		setValue("category", product?.category._id || "");
		setValue("price", product?.price || "");
		setValue("image", product?.image || "");
		setValue("active", product?.active || "");
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;
			if (!search) getProducts();

			if (search.length <= 3) return;

			const response = await axios.get(`${URL}/products/search/${search}`);

			const products = response.data.products;

			setDbProducts(products);
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
			<h1 className="title-admin">ADMIN PRODUCTS</h1>
			<div className="admin-dashboard">
				<div className="form-container">
					<form className="admin-form" onSubmit={handleSubmit(submittedData)}>
						{productId && (
							<button
								className="btn btn-delete btn-cancel"
								onClick={() => setFormValue()}
							>
								<i className="fa-solid fa-xmark"></i>
							</button>
						)}
						<div className="form-info">
							<label htmlFor="product">Producto</label>
							<input
								type="text"
								id="product"
								className="admin-input"
								{...register("name")}
							/>
						</div>
						<div className="form-info">
							<label htmlFor="">Precio</label>
							<input
								type="number"
								className="admin-input"
								{...register("price")}
							/>
						</div>
						<div className="form-info">
							<label htmlFor="">Descripcion</label>
							<textarea
								rows={6}
								className="admin-input"
								{...register("description")}
							></textarea>
						</div>
						<div className="form-info">
							<label htmlFor="">Imagen</label>
							<input
								type="file"
								accept="image/*"
								className="admin-input"
								{...register("image")}
							/>
						</div>
						<div className="form-active">
							<label htmlFor="">Activo</label>
							<input
								type="checkbox"
								className="admin-input"
								{...register("active")}
							/>
						</div>
						<div className="form-info">
							<label htmlFor="category">Categoría</label>
							<select
								id="category"
								className="admin-input"
								{...register("category")}
							>
								<option selected={true} disabled>
									Seleccione una categoria
								</option>
								{categories.map((category) => (
									<option key={category._id} value={category._id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-submit">
							<button type="submit" className={productId ? "btn-success" : ""}>
								{productId ? "Editar Producto" : "Añadir Producto"}
							</button>
						</div>
					</form>
				</div>
				<div className="table-container">
					<div className="flex-between">
						<h2 className="title-products">Tabla de productos</h2>
						<div className="search-product">
							<input
								type="text"
								onKeyUp={handleSearch}
								placeholder="Buscar producto"
							/>
						</div>
					</div>
					<ProductTable
						products={dbProducts}
						deleteProduct={deleteProduct}
						setFormValue={setFormValue}
					/>
				</div>
			</div>
		</>
	);
}
