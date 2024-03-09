import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header/Header";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AboutUs from "./pages/AboutUs/AboutUs";
import AdminProduct from "./pages/AdminProduct/AdminProduct";
import AdminRoute from "./Guard/AdminRoute/AdminRoute";
import AdminUser from "./pages/AdminUser/AdminUser";
import Footer from "./Layout/Footer/Footer";
import Cart from "./Layout/Cart/Cart";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
	return (
		<>
			<Header />
			<Cart />

			<main className="main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/login" element={<Login />} />
					<Route path="/product-detail/:id" element={<ProductDetail />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/admin-product"
						element={
							<AdminRoute>
								<AdminProduct />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin-user"
						element={
							<AdminRoute>
								<AdminUser />
							</AdminRoute>
						}
					/>
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
