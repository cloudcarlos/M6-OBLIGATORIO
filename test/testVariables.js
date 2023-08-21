/**
 * testVariables permite controlar el funcionamiento de los test
 * manejando las variables que se utilizaran en los test.
 * 
 * 
 */
const random = Math.floor(Math.random() * 100) + 1;

const variablesComunes = {
	nuevoAnimeNombre: `Nuevo anime N° ${random}`,
	idBusqueda: 3,
	idAModificar: 4,
	idAEliminar: 5,
	nombreBusqueda: "an", 
	ruta: '/api/v1/animes',
}

module.exports = variablesComunes;