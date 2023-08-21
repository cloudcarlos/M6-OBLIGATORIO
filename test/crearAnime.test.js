const expect = require('chai').expect;
const request = require("supertest");
const app = require("../src/app");
const variablesComunes = require('./testVariables');

/**
 * http://localhost:3000/api/v1/animes/
 * 
 * {
		"newId": 'nuevoId AUTOGENERADO'
		}
 */

const ruta = variablesComunes.ruta;
const textDescribe = `
	Pruebas de Rutas y Peticiones HTTP POST ${ruta} Creacion de animé. 
`;

describe(textDescribe, function () {

	it(`Debería crear un nuevo anime usando POST`, async function () {
		const newAnime = {
			nombre: variablesComunes.nuevoAnimeNombre,
			genero: 'Mecha',
			año: '2020',
			autor: 'TripleG S.A.',
		}
		const response = await request(app)
			.post(ruta)
			.send(newAnime);

		expect(response.status).to.equal(201, "Error al intentar registrar el nuevo animé.");
		expect(response.body.newId).to.be.a('number');
	});

})