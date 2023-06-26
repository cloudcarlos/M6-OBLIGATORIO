const express = require("express");
const { create } = require("express-handlebars");
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');
const { exec } = require('child_process');
const animeRutas = require('./router/anime_rutas.js');

const app = express();

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
const PORT = 3000
app.listen(PORT, () =>{
    console.log(`Servidor iniciado e puerto ${PORT}.::`);
    const command = process.platform === 'win32' ? 'start' : 'open';
    exec(`${command} http://localhost:${PORT}/`);
});



