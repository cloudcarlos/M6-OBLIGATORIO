import {v1 as uuidv1} from "uuid";
import fs from "fs";

const path =  require('path');
const rutaJson = path.resolve(__dirname, '../database/animes.json');

//devolver todos los anime
exports.getAll =()=> {
    const data = JSON.parse(fs.readFileSync( rutaJson, 'utf8' ));
    return data;
}

//devolver un solo anime
exports.getOne =(...filter)=> {
    const data = JSON.parse(fs.readFileSync( rutaJson, 'utf8' ));
    const anime = data[id];
    if(anime) {
        return anime;
    } else {
        throw new Error('No encontramos tu anime');
    }
}

//crear un anime
exports.newAnime = (nuevoAnime) => {
    const data = JSON.parse(fs.readFileSync( rutaJson, 'utf8'));
    const animes = JSON.parse(data);
    //uuid para generar un id unico
    const nuevoId = uuidv1();

    animes[nuevoId] =  nuevoAnime;

    let animesJSON = JSON.stringify(animes, null, 4);
    fs.writeFileSync(rutaJson, animesJSON);
}



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
app.delete('/api/animes/:id', (req,res) => {
    const data = JSON.parse(fs.readFileSync('./animes.json','utf8'));
    const anime = data[req.params.id];

    if( anime) {
        delete data[req.params.id];
        fs.writeFileSync('./animes.json', JSON.stringify(data,null,4));
        res.send({ message: 'Animé eliminado exitosamente.'});
    } else {
        res.status(404).send({ error: 'Animé no encontrado.'});
    }
});

app.listen(3000, ()=> {
    console.log('escuchaaaaaaaaaaanding puerto 3000.....')
})
