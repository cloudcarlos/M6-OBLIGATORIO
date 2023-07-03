const express = require('express');
const animeController = require('../controllers/animeController.js');
//
const { validarAnimeForm, validarForm } = require('../middlewares/validationMiddleware.js');

const router = express.Router();

// RUTAS FRONTEND

router.get(['/','/home','/animes'], animeController.mostrarTodos );

router.get('/animes/nuevo', animeController.agregarAnime );

router.get("/animes/busqueda/", animeController.mostrarFormularioBusqueda );

router.get("/animes/busqueda/:palabra", animeController.mostrarResultadoBusqueda );

router.get("/animes/detalles/:id", animeController.mostrarDetalles);

router.get('/animes/editar/:id/', animeController.editarAnime );

router.get('/readme', (req,res)=>res.render('readme'));


// ENDPOINT BACKEND

// obtener todos los animes
router.get('/api/vi/animes', animeController.obtenerAnimes);

// obtener un solo anime
router.get('/api/vi/animes/:id', animeController.obtenerUnAnime);

// obtener animes por genero
router.get('/api/vi/animes/genero/:filtro', animeController.obtenerAnimePorGenero);

// nuevo anime
router.post('/api/vi/animes', animeController.crearAnime);

// actualizar un anime
router.put('/api/vi/animes/:id', animeController.actualizarAnime);

// eliminar un anime
router.delete("/api/vi/animes/:id", animeController.eliminarAnime)

// ENDPOINT MANEJADOR DE LAS RUTAS QUE NO SEA NINGUNA DE LAS REGISTRADAS
router.all("*", (req, res) => {
    res.status(404).send("Recurso no encontrada.");
});


module.exports = router;