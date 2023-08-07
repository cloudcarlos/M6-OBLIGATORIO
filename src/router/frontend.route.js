const express = require('express');
const frontend = require('../controllers/fontend.controller')
const router = express.Router();

// RUTAS FRONTEND

router.get(['/','/home','/animes'], frontend.Home );

router.get('/animes/nuevo', frontend.nuevoAnime );

router.get("/animes/busqueda/", frontend.busqueda );

router.get("/animes/busqueda/:busqueda", frontend.busqueda );

router.get("/animes/detalles/:id", frontend.detalles);

router.get('/animes/editar/:id/', frontend.editarAnime );

router.get('/readme', (req,res)=>res.render('readme'));

module.exports = router;