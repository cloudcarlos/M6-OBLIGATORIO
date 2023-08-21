const express = require('express');
const frontend = require('../controllers/fontend.controller')
const router = express.Router();

// RUTAS FRONTEND

router.get(['/', '/home', '/animes'], frontend.Home);

router.get("/animes/busqueda/", frontend.busqueda);

router.get("/animes/detalles/:id", frontend.detalles);

router.get('/readme', frontend.readme);

// manejamos las rutas no encontradas

router.use((req, res) => {
  res.status(404).render('404', {
    title:'404 Not Found',
    h1:'Recurso No Encontrado, Error 404',
  });
});

module.exports = router;