const URL = import.meta.env.VITE_SERVER_URL;

export const ProductTable = ({ products, deleteProduct, setFormValue }) => {
	return (
		<div className="table-container">
			<table className="table">
				<thead>
					<tr className="table-head">
						<th>Imagen</th>
						<th>Nombre Completo</th>
						<th>Descripción</th>
						<th>Categoría</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{products.map((prod) => (
						<tr key={prod._id}>
							<td>
								<img
									className="product-table-img"
									src={
										prod.image
											? `${URL}/images/products/${prod.image}`
											: `${URL}/images/products/picture-default.png`
									}
									alt={prod.name}
								/>
							</td>
							<td className="table-name">{prod.name}</td>
							<td className="table-description">{prod.description}</td>
							<td className="table-category">
								{prod.category ? prod.category.name : "SIN CATEGORÍA"}
							</td>
							<td className="table-price">{prod.price}</td>
							<td className="table-actions">
								<button
									className="btn btn-delete"
									onClick={() => deleteProduct(prod._id)}
								>
									<i className="fa-solid fa-trash"></i>
								</button>
								<button
									className="btn btn-edit"
									onClick={() => setFormValue(prod)}
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
