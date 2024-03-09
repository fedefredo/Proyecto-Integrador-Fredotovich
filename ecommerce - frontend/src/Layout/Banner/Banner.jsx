import "./Banner.css";
const URL = import.meta.env.VITE_SERVER_URL;

export const Banner = () => {
	return (
		<div className="main-banner">
			<img
				src={`${URL}/images/banner/banner-img.jpg`}
				alt=""
				className="banner-img"
			/>
			<div class="banner-info">
				<h1 class="banner-title">MYPHONE</h1>
			</div>
		</div>
	);
};
