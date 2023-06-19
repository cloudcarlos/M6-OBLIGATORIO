import express from "express";
import morgan from "morgan";
import animeRutas from './rutas/animeRutas.js';
import cors from "cors";

// instanciamos express
const app = express();
// cors para evitar los errores de solicitud de origen cruzado (Cross-Origin Request, o CORS)
app.use(cors());
// los Middleware para los json y las peticiones http
app.use(express.json());
app.use(morgan('tiny'));
// usaremos las rutas definidas en el archivo animeRutas
app.use(animeRutas);
// iniciamos el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});


