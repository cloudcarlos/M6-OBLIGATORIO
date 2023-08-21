const expect = require('chai').expect;
const request = require("supertest");
const app = require("../src/app");
const variablesComunes = require('./testVariables');

/**
 * http://localhost:3000/api/v1/animes/7
 * {
    "message": "Anime actualizado exitosamente."
    }
 */
    const id = variablesComunes.idAModificar;
    const ruta = `${variablesComunes.ruta}/${id}` ;
    const textDescribe = `
        Pruebas de Rutas y Peticiones HTTP PUT ${ruta} Actualización de animé con id ${id} .-
    `;

    describe(textDescribe, function() {

        it(`Deberia actulizar un anime existente de id ${id} usando PUT`, async function() {

        const updatedAnime = {
            nombre: "Anime de prueba Actualizado",
            genero: 'Seinen',
            año: '1991',
            autor: 'Mi mismo csm',
        }
        const response = await request(app)
            .put(ruta)
            .send(updatedAnime);
        
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Anime actualizado exitosamente.');

        });


    });