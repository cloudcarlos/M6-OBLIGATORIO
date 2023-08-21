const expect = require('chai').expect;
const request = require("supertest");
const app = require("../src/app");
const variablesComunes = require("./testVariables")

/**
 * http://localhost:3000/api/v1/animes/7
 * {
    "message": "Anime con ID 7 ha sido eliminado exitosamente."
}
 */

const id = variablesComunes.idAEliminar;
const ruta = `${variablesComunes.ruta}/${id}`;
const textDescribe = `
    Pruebas de Rutas y Peticiones HTTP DELETE ${ruta} Eliminación de animé con id ${id} .-
`;

describe(textDescribe, function() {

    it(`Deberia eliminar un animé existente de id ${id} usando DELETE`, async function() {

        const response = await request(app)
            .delete(ruta);
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(`Anime con ID ${id} ha sido eliminado exitosamente.`);
    });


});