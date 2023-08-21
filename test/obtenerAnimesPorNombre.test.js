const expect = require('chai').expect;
const request = require("supertest");
const app = require("../src/app");
const variablesComunes = require('./testVariables');

/**
 * http://localhost:3000/api/v1/animes/nombre/u
 * {
		"animesFiltrados": [
			{
				"nombre": "Naruto",
				"genero": "Shonen",
				"año": 2002,
				"autor": "Masashi Kishimoto"
			},
			{
				"genero": "ni idea",
				"año": 1999,
				"autor": "Eiichiro Oda"
				"nombre": "GUAN PIZuuu\n",
				}
		]
	}
 */

const busqueda = variablesComunes.nombreBusqueda;
const ruta = `${variablesComunes.ruta}/nombre/${busqueda}`;

const textDescribe = ` Pruebas de Rutas y Peticiones HTTP ${ruta} .- `;

describe(textDescribe, function () {
	let response, data, animes;
	beforeEach(async function () {
		response = await request(app).get(ruta);
		data = await response.body;
		animes = data.animesFiltrados;
		return;
	});

	it(`La ruta ${ruta} debe de responder con codigo 200.`, async function () {
		expect(response.status)
			.to.equal(200, "La ruta arroja un status distinto de 200.")
	});

	it(`La ruta ${ruta} debe de responder con un objeto que contenga una propiedad 'animesFiltrados'.`, function () {
		expect(data)
			.to.be.an('object');
		expect(data)
			.to.have.property('animesFiltrados')
			.that.is.an('object');
	});

	it(`AnimesFiltrados debe de contener objetos que tengan las propiedades |Nombre,Genero,Año,Autor|.`, async function () {
		expect(animes)
			.to.be.an('object');
		for (const id in animes) {
			const anime = animes[id];
			expect(anime).to.have.all.keys('nombre', 'genero', 'año', 'autor');
		}
	});

	it(`La propiedades |Nombre,Genero,Año,Autor| de cada anime encontrado, no pueden estar vacias.`, async function () {
		for (const id in animes) {
			const anime = animes[id];
			const { nombre, genero, año, autor } = anime;
			expect(nombre, "El nombre no debe de estar vacío")
				.to.not.be.empty;
			expect(genero, "El genero no debe de estar vacío")
				.to.not.be.empty;
			expect(año, 'El año no debe de estar vacío.')
				.to.not.be.null;
			expect(año, 'El año no debe de estar vacío.')
				.to.not.be.undefined;
			expect(autor, "El autor no debe de estar vacío")
				.to.not.be.empty;
		}
	});

});


