const Anime = require("../models/Anime.model");

async function Home (req, res) {
  res.render('home', {
    title: req.app.locals.appName,
    h1: 'Todos los Animes',
  })
};

const detalles = async (req, res) => {
  const id = req.params.id;
  res.render("details_anime", {
      title: 'Detalles del Anime',
      id: id,
  })
};

const nuevoAnime = async (req, res) => {

  try {
    res.render("new_anime", {
      title: 'Nuevo Anime',
      h1: 'Ingreso de un nuevo Anime',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Internal server error',
      error: error.message
    });
  };
};

const busqueda = async (req, res) => {
  
  res.render('search', {
      title: 'Busqueda Api Animes',
      h1: 'Busqueda de Animes',
      params : req.params.busqueda || '',
    })
};


const editarAnime = async (req, res) => {
  try {
    let data = await leerDatabase();

    const id = req.params.id;

    const mapData = new Map(Object.entries(data));

    if (!mapData.has(id)) {
      res.status(404).send({
        message: "No existe el anime.",
      });
    }

    let anime = mapData.get(id);
    anime = { id, ...anime }
    //res.send(anime)        

    //  *  para poder renderizar en el menu de generos y
    //  * y que aparezcan marcados los ya seleccionados
    //  * creé una array nuevo donde van los gerenos, 
    //  * tanto los seleccionados como los disponibles
    //  * Devuelve un array de objetos::
    //  *  { "nombre": "Sobrenatural","seleccionado": false }, { "nombre": "Acción","seleccionado": true },
    // data es todo el json de animes
    // 
    const listado = Object.values(data).flatMap((anime) => anime.genero);
    const generosDisponibles = [...new Set(listado)];

    const generosAsignados = anime.genero;

    const generosSeleccionados = generosDisponibles.map(genero => ({
      nombre: genero,
      seleccionado: generosAsignados.includes(genero)
    }));

    res.render("edit_anime", {
      title: 'Edicion del Anime',
      h1: 'Edicion del Anime',
      data: {
        dataForm: anime,
        submitText: 'Editar Anime',
        generosForm: generosSeleccionados
      },
    });
    //res.send(generosSeleccionados);
  } catch (error) {
    res.status(500).send({
      error: "error 500 " + error,
    });
  }
}

const frontend = {
  Home,
  detalles,
  nuevoAnime,
  busqueda,
  editarAnime,
};

module.exports = frontend;