const express = require("express");
//iniciamos el servidor express
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const animeRutas = require('./router/anime_rutas.js');
const { exec } = require('child_process');
const { create } = require("express-handlebars");

//archivo config para sumar variables de entorno
const config = require('./config.js');

//obtenemos el nombre appName desde el archivo package.json
app.locals.appName = require('./package.json').name;

//configuración handlebars
const hbs = create({
    partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//morgan para log de peticiones http
app.use(morgan('short'));

//middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware de carga simulada ( idea de marcelo <3 )
const delayMiddleware = (req, res, next) => setTimeout(next, 500);
app.use(delayMiddleware);

// middleware para los errores cors
app.use(cors());

// compartir carpeta public
app.use(express.static('public'));
// usamos las rutas anime_rutas.js
app.use(animeRutas);

// iniciamos el servidor 
app.listen(config.PORT, () =>{
    console.log(`servidore inicciate e port ${config.PORT}.::`);
    const abrirHome = process.platform === 'win32' ? 'start' : 'open';
    exec(`${abrirHome} http://${config.HOST}:${config.PORT}/`);
});



