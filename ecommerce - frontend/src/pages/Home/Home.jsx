import { Banner } from "../../Layout/Banner/Banner";
import { ProductCardsContainer } from "../../components/ProductCardsContainer/ProductCardsContainer";
import "./Home.css";

export default function Home() {
	return (
		<>
			<Banner />
			<div className="main-container">
				<ProductCardsContainer />
			</div>
		</>
	);
}
