const express = require('express');
const animeController = require('../controllers/animes.controller');
const router = express.Router();

// RUTAS BACKEND
// prefijo /api/v1/
// obtener todos los animes
router.get('/animes', animeController.obtenerAnimes);

// obtener anime por id
router.get('/animes/:id', animeController.obtenerUnAnime);

// obtener animes por nombre
router.get('/animes/nombre/:nombre', animeController.obtenerAnimePorNombre);

// obtener animes por genero
router.get('/animes/genero/:genero', animeController.obtenerAnimePorGenero);

// nuevo anime
router.post('/animes', animeController.crearAnime);

// actualizar un anime
router.put('/animes/:id', animeController.actualizarAnime);

// eliminar un anime
router.delete("/animes/:id", animeController.eliminarAnime)

// ENDPOINT MANEJADOR DE LAS RUTAS QUE NO SEA NINGUNA DE LAS REGISTRADAS
router.all("*", (req, res) => {
    res.status(404).send("Recurso no encontrada.");
});


module.exports = router;