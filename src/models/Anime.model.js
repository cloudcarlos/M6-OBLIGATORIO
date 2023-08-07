const fs = require('fs');
const path = require("path");

// ACCESO A DATABASE animes.json
const rutaDatabase = path.resolve(__dirname, '../database/animes.json');
/**
 * funcion para ordenar los indices del json
 * y devulver un nuevo id
 */
function obtenerNuevoId(data) {
  const ids = Object.keys(data).map(Number);
  const nuevoId = Math.max(...ids) + 1;
  return nuevoId;
};

// Leer la base de datos de animes desde el archivo JSON
const leerDatabase = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(rutaDatabase, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Guardar datos en la base de datos de animes en el archivo JSON
const guardarDatabase = async (data) => {
  return new Promise((resolve, reject) => {
    const dataActualizada = JSON.stringify(data, null, 2);
    fs.writeFile(rutaDatabase, dataActualizada, (err) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
};

// Obtener todos los animes de la base de datos
async function buscarTodos() {
  try{
    const data = await leerDatabase();
    return data;
  }catch(error){
    throw new Error('Error al obtener los animes');
  }
};

// Obtener un anime por su ID, de la base de datos
async function buscarPorId(id) {
  try{
    console.log("id en buscarPorId: "+id)
    const data = await leerDatabase();
    if (!data[id]) {
      throw new Error('No se encontró ningún anime con el ID proporcionado');
    }
    return data[id]
  } catch(error){
    throw new Error('Error al obtener el anime por ID');
  }
};

// Crear un nuevo anime en la base de datos
async function crear(nuevoAnime) {
  try {
    const data = await leerDatabase();
    const nuevoId = obtenerNuevoId(data);
    data[nuevoId] = nuevoAnime;
    await guardarDatabase(data);
    return nuevoId;
  } catch (error) {
    throw new Error('Error al crear el anime');
  }
};

// Actualizar un anime en la base de datos
async function actualizar(id, nuevaData) {
  try {
    console.log(`id => ${id} || data => ${nuevaData}`);
    const data = await leerDatabase();
    data[id] = nuevaData; // Aquí asignamos directamente los nuevos valores al objeto con la clave 'id'
    await guardarDatabase(data);
    return "Anime actualizado exitosamente.";
  } catch (error) {
    throw new Error('Error al actualizar el anime');
  }
};

// Eliminar un anime de la base de datos
async function eliminar(id) {
  try {
    const data = await leerDatabase();
    delete data[id];
    await guardarDatabase(data);
    return "Anime eliminado exitosamente.";
  } catch (error) {
    throw new Error('Error al eliminar el anime');
  }
};

const Anime = {
  buscarTodos,
  buscarPorId,
  crear,
  actualizar,
  eliminar,
};

module.exports = Anime;






