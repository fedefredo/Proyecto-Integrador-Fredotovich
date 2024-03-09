export default function formatDate(fecha) {
	if (!fecha) return "SIN FECHA";
	const date = new Date(fecha);
	const dateFormat = new Intl.DateTimeFormat("es-AR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	return dateFormat.format(date);
}
