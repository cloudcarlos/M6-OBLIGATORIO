const expect = require('chai').expect;
const request = require("supertest");
const app = require("../src/app");

/**
 * {
    "animes": {
        "1": {
            "nombre": "Akira",
            "genero": "Seinen",
            "año": "1988",
            "autor": "Katsuhiro Otomo"
        },
        "2": {...
 * 
 */

describe('Pruebas de Rutas y Peticiones HTTP /api/v1/animes ', function () {
  const ruta = "/api/v1/animes";
  let response,data,animes ;
  beforeEach(async function () {
    response = await request(app).get(ruta);
    data = await response.body;
    animes = data.animes;
  });

  it(`La ruta ${ruta} debe de responder con codigo 200.`, async function () {
    expect(response.status)
      .to.equal(200,"La ruta arroja un status distinto de 200.");
  });

  it(`La ruta ${ruta} debe de responder con el encabezado ('application/json)`, async function () {
    expect(response.headers['content-type'])
      .to.include('application/json');
  });

  it(`La ruta ${ruta} debe de responder con un objeto que contenga una propiedad 'animes'.`, function () {
    expect(data)
      .to.be.an('object');
    expect(data)
      .to.have.property('animes')
      .that.is.an('object');
  });

  it(`La ruta ${ruta} debe de responder con las propiedades nombre y id.`, async function () {
    for (const id in animes) {
      const anime = animes[id];
      expect(anime)
        .to.be.an('object');
      expect(anime)
        .to.have.all.keys('nombre', 'genero', 'año', 'autor');
    }
  });

  it(`La propiedad 'nombre' de cada anime debe ser una cadena no vacía.`, function() {
    for (const id in animes) {
      const anime = animes[id];
      expect(anime.nombre)
        .to.be.a('string',"Alguno de los valores |Nombre| está vacío.")
        .that.is.not.empty;
    }
  });

  it("Los valores de la propiedad 'año' deben ser números.", function() {
    for (const id in animes) {
      const anime = animes[id];
      expect(anime.año)
        .to.be.a('number',"Alguno de los valores |Año| no es de tipo Number.");
    }
  });

  

});