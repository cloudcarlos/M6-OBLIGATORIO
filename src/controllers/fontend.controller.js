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

const busqueda = async (req, res) => {
  
  res.render('search', {
      title: 'Busqueda Api Animes',
      h1: 'Busqueda de Animes',
      params : req.params.busqueda || '',
    })
};

const readme = async (req,res) => {
  res.render('readme');
}


const frontend = {
  Home,
  detalles,
  busqueda,
  readme,
};

module.exports = frontend;