import express from 'express';
const router = express.Router(); 
//import * as animeController from '../controller/animeController.js';

router.get('/', (req,res) => {
    res.send('Bienvenidos a la Anime API');
});

router.get('/animes', (req,res) => {
    res.send('Listado de todos los anime');
});

router.get('/animes/id/:id', (req,res) => {
    res.send('Anime busqueda por ID');
});

router.get('/animes/nombre/:nombre', (req,res) => {
    res.send('Anime busqueda por nombre');
});

router.use( (req,res,next) => {
    res.status(404).send({ error: "Error 404 recurso no encontrado."});
});

export default router;