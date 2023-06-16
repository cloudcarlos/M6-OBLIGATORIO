import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";

//instanciado de express
const app = express();

//morgan para el log de las peticiones http
app.use(morgan('combined'));

//body-parser para parsear los json y las urlencoded
app.use(bodyParser.json());
app.use(bodyParser .urlencoded( { extended:true } ));

//rutas para los animes
app.get( '/api/animes', (req,res) => {
    //como el json es un archivo local, con readFileSync rescatamos la data
    const data = JSON.parse(fs.readFyleSync( './animes.json', 'utf8' ));
    res.send(data);
});

app.get('/api/animes/:id', (req,res) => {
    const data = JSON.parse(fs.readFileSync( './animes.json', 'utf8'));   
    const anime = data[req.params.id];
    
    if(anime) {
        res.send(anime);
    } else {
        res.status(404).send({ error: 'No encontramos tu anime' });
    }
});
//creacion de un nuevo anime
app.post( '/api/animes', (req,res) => {
    const data = JSON.parse(fs.readFileSync('./animes.json', 'utf8'));
    /* para ir aumentando el id en los nuevos anime, extraigo el lenght
     * de todos los json y le sumo 1;
     */
    const nuevoId = Object.keys(data).length + 1;
    data[nuevoId] = req.body;

    /* guardamos dentro de animes.json, la data.json,
     * incluyendo todas las propiedades de la cadena
     * y con identacion de 4 espacios, como si fuese un tab
     */
    fs.writeFileSync('./animes.json', JSON.stringify(data,null,4));
    res.send({ 
        message: 'Anime creado exitosamente.',
        anime: data[nuevoId] });
    });

// actualizar un anime existente
app.put('/api/animes/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./animes.json','utf8'));
    const anime = data[req.params.id];

    //validamos si leyó el archivo
    if (anime) {
        /* usamos propagación para poder manejar eventualmente
         * si enviamos mas de un anime, 
         * o si enviamos mas o menos propiedades dentro del json
        */
        data[req.params.id] = { ...anime, ...req.body }
        fs.writeFileSync('./animes.json', JSON.stringify(data,null,4));
        res.send({ 
            message: 'Anime actualizado exitosamente.',
            anime: data[req.params.id]
        });
    } else {
        res.status(404).send({ error: 'Anime no encontrado'});
    }
});

// borrar un animé existente
app.delete('/api/animes/:id', (req,re))


