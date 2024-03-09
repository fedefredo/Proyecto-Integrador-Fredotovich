import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="proyect-info">
        <h1 className="proyect-title">Proyecto MYPHONE</h1>
        <p className="proyect-description">
          En MYPHONE nos encargamos de entregarte el celular que desees en un
          corto tiempo, y todo, desde la comodidad de tu casa. Contamos con una
          gran variedad de modelos para su distinto tiempo y tipo de uso.
        </p>
        <p className="proyect-description">
          Nuestro objetivo es brindar todas las comodidades al usuario para que
          pueda elegir el celular que quiera dependiendo de su gusto y de su
          intención con el mismo. Por ello, cada modelo contiene una breve
          descripción para que el comprador visualice cuál teléfono es la mejor
          opción.
        </p>
        <p className="proyect-description" id="proyect-phrase">
          En MYPHONE, calidad y necesidad van de la mano.
        </p>
      </div>
      <div className="presentation-card">
        <h1 className="proyect-title">Creador de la página</h1>
        <p className="proyect-description">
          Me llamo Federico Fredotovich. Tengo 19 años, estudio Ingeniería
          Informatica y soy alumno del curso Full Stack Engineer.
        </p>
      </div>
    </div>
  );
}
