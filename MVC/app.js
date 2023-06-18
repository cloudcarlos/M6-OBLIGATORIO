import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import animeRutas from './routes/animeRutas.js'

//instanciamos express
const app = express();

//middleware para el log de las peticiones http
app.use(morgan('tiny'));

//body-parser para parsear los json y las urlencoded
app.use(bodyParser.json());
app.use(bodyParser .urlencoded( { extended:true } ));

//usaremos las rutas definidas en el archivo animeRutas
app.use(animeRutas)

//iniciamos el servidor
const PORT =  3000
app.listen(PORT, ()=> {
    console.log('escuchaaaaaaaaaaanding puerto 3000.....')
})


