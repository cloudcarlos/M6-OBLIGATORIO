const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const { create } = require("express-handlebars");
const animeRutas = require('./router/anime.route');
const frontendRutas = require("./router/frontend.route");

// iniciamos el servidor express
const app = express();

// obtenemos el nombre appName desde el archivo package.json
// y utilizarlo como title en las vistas
app.locals.appName = require('../package.json').name;

// configuración handlebars
const hbs = create({
    partialsDir: [path.resolve(__dirname,"views/partials/")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// morgan para log de peticiones http
app.use(morgan('short'));

// middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware de carga simulada ( idea de marcelo <3 )
const delayMiddleware = (req, res, next) => setTimeout(next, 100);
app.use(delayMiddleware);

// middleware para los errores cors
app.use(cors());

// compartir carpeta public
app.use(express.static('public'));

// usamos las rutas
app.use("/api/v1/", animeRutas );
app.use("/", frontendRutas)


module.exports = app ;

