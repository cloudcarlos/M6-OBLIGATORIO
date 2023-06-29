const express = require("express");
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const animeRutas = require('./router/anime_rutas.js');
const { exec } = require('child_process');
const { create } = require("express-handlebars");
//archivo config para sumar variables de entorno
const config = require('./config.js');
//favicon
const favicon = require('serve-favicon');

//iniciamos el servidor express
const app = express();

//obtenemos el nombre desde el archivo package.json
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

// configuracion de winston, para manejar los errores
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({ 
            filename: './logs/error.log', 
            level:'error' 
        }),
        new winston.transports.File({ 
            filename: './logs/app.log', 
            level:'info' 
        }),
    ],
});

// middleware de manejo de errores

const registroExitoso =  async (req,res,next) => {
    logger.info(`success - method: ${req.method}, URL: ${req.url}`)
    next();
}

const registroErrores = async (err,req,res,next) => {
    logger.error(`error - method: ${req.method}, URL: ${req.url}, mensaje: ${err.message}`);
    next();
}

app.use(registroExitoso);
app.use(registroErrores);

//usamos app.get favicon para evitar problemas de reenvio de headers
app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + './public/favicon2.ico');
    next()
});

// iniciamos el servidor 
app.listen(config.PORT, () =>{
    console.log(`servidore inicciate e port ${config.PORT}.::`);
    const abrirHome = process.platform === 'win32' ? 'start' : 'open';
    exec(`${abrirHome} http://${config.HOST}:${config.PORT}/`);
});



