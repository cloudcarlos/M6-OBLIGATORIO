/**
 * Al ser una app tan simple, no usaré controller o model,
 * escribiré la logica en el archivo animeRutas
 */

import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


//rutaJson almacena la ruta absoluta de animes.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rutaJson = resolve(__dirname, '..', 'database', 'animes.json');


const router = express.Router(); 

router.get('/', (req,res) => {
    res.send({message:'Bienvenidos a la Anime API'});
});

router.get('/animes', async (req,res) => {
    //capturamos los parametros de consulta con req.query
    const {id,nombre} = req.query
    let data = await JSON.parse(fs.readFileSync(rutaJson, 'utf8'));

    if (id){
        const anime = data[req.params.id];
        if (anime) {
            res.json(anime);
        } else {
            res.status(404).send({ error: 'Anime no encontrado' });
        }
        //res.send('Anime busqueda por ID');
    } else if (nombre) {
        res.send('Anime busqueda por nombre');
    }
    else{
        res.send(data);
    }
});

router.use((req,res) => {
    res.status(404).send({ url: req.originalUrl + ' no encontrado' });
});

export default router;