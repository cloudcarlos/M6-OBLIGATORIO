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
router.get('/animes/genero/:genero', animeController.obtenerAnimesPorGenero)

// nuevo anime
router.post('/animes', animeController.crearAnime);

// actualizar un anime
router.put('/animes/:id', animeController.actualizarAnime);

// eliminar un anime
router.delete("/animes/:id", animeController.eliminarAnime)

// manejamos las rutas no encontradas
router.use( (req,res)=>{
    res.status(404).json({
        code:404,
        message: "Recurso no encontrado en el backend."
    });
});


module.exports = router;