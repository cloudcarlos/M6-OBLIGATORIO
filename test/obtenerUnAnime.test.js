const expect = require('chai').expect;
const request = require("supertest");
const app = require("../src/app");
const variablesComunes = require('./testVariables');

/**
 * http://localhost:3000/api/v1/animes/3
 * 
 * {
    "anime": {
        "nombre": "Sailor Moon",
        "genero": "Shojo",
        "año": 1992,
        "autor": "Naoko Takeuchi"
    }
    }
 * 
 */
const id = variablesComunes.idBusqueda;
const ruta = `${variablesComunes.ruta}/${id}`; 
const textDescribe = ` Pruebas de Rutas y Peticiones HTTP /api/v1/animes/3 .- `;

describe(textDescribe, function() {
  let response,data;
  beforeEach( async function() {
    response = await request(app).get(ruta);
    data = await response.body;
    return ;
  });

  it(`La ruta ${ruta} debe de responder con codigo 200.`, async function() {
    expect(response.status)
      .to.equal(200,'La ruta arroja un status distinto de 200');
  });

  it(`La ruta ${ruta} debe de responder con el encabezado ('application/json)`, async function() {
    expect(response.headers['content-type'])
      .to.include('application/json');
  });

  it(`La ruta ${ruta} debe de responder con un objeto que contenga una propiedad 'anime.`, async function() {
    expect(data)
      .to.be.an('object');
    expect(data)
      .to.have.property('anime')
      .that.is.an('object');
  });

  it(`Anime debe de contener las propiedades nombre,genero,año y autor.`, async function() {
    expect(data.anime)
      .to.be.an('object');
    expect(data.anime)
      .to.have.all.keys('nombre','genero','año','autor');
  });

  it(`La propiedades |Nombre,Genero,Año,Autor| no pueden estar vacias.`, async function() {
    const {nombre,genero,año,autor} = data.anime
    expect(nombre,"El nombre no debe de estar vacío")
      .to.not.be.empty;
    expect(genero,"El genero no debe de estar vacío")
      .to.not.be.empty;
    expect(año,'El año no debe de estar vacío.')
      .to.not.be.null;
    expect(año,'El año no debe de estar vacío.')
      .to.not.be.undefined;
    expect(autor,"El autor no debe de estar vacío")
    .to.not.be.empty;
  });

  it(`Las propiedades |Nombre,Genero,Autor| deben de ser de tipo String.`, async function() {
    const {nombre,genero,autor} = data.anime;
    //expect(nombre).to.be.a("string");
    expect(nombre)
      .to.be.a('string',"El Nombre debe de ser del tipo string.");
    expect(genero)
      .to.be.a("string",'El Genero debe de ser del tipo string.');
    expect(autor)
      .to.be.a("string",'El Autor debe de ser del tipo string.');
  });

  it(`La propiedad |Año| debe de ser de tipo Number.`, async function() {
    const {año} = data.anime
    expect(año)
      .to.be.a('number',"El Año debe de ser del tipo number.");
  });

});
