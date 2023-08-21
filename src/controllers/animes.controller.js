const Anime = require('../models/Anime.model')

async function obtenerAnimes(req, res) {
  try {
    let animes = await Anime.buscarTodos();
    res.status(200).json({ animes });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
};

async function obtenerUnAnime(req, res) {
  try {
    let id = req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ error: "Debes proporcionar un id válido para buscar." });
    }
    id = Number(id);
    const anime = await Anime.buscarPorId(id);
    res.status(200).json({ anime });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
};

async function obtenerAnimePorNombre(req, res) {
  try {
    let nombre = req.params.nombre || req.query.nombre;
    if (!nombre) {
      return res.status(400).json({ error: "Debes proporcionar un nombre válido para buscar." });
    }
    nombre = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const animes = await Anime.buscarTodos();
    const animesFiltrados = {};
    for (const id in animes) {
      const anime = animes[id];
      const animeNombre = anime.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (animeNombre.includes(nombre)) {
        animesFiltrados[id] = anime;
      }
    };
    res.status(200).json({ animesFiltrados });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

async function obtenerAnimesPorGenero(req, res) {
  try {
    let genero = req.params.genero || req.query.genero;
    if (!genero) {
      return res.status(400)
        .json({
          error: "Debes proporcionar un genero válido para buscar.",
        });
    };
    genero = genero.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const animes = await Anime.buscarTodos();
    const animesFiltrados = {};
    for (const id in animes) {
      const anime = animes[id];
      const animeGenero = anime.genero.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (animeGenero.includes(genero))
        animesFiltrados[id] = anime;
    };
    res.status(200).json({ animesFiltrados });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

async function crearAnime(req, res) {
  try {
    // validamos que la información a guardar, al menos, vaya en el formato correcto y que no sean campos nulos
    for (const key in req.body) {
      if (!req.body[key]) {
        return res.status(400).json({
          message: "Campos vacios",
        });
      }
    }

    const { nombre, genero, año, autor } = req.body;
    const nuevoAnime = {
      nombre: String(nombre),
      genero: String(genero),
      año: new Date(Number(año), 0).getFullYear(),
      autor: String(autor)
    };

    const newAnimeId = await Anime.crear(nuevoAnime)
    res.status(201).json({
      newId: newAnimeId
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    })
  }
};

async function actualizarAnime(req, res) {
  try {
    // validamos que la información a guardar, al menos, vaya en el formato correcto y que no sean campos nulos
    for (const key in req.body) {
      if (!req.body[key]) {
        return res.status(400).json({
          message: "Campos vacios",
        });
      }
    }

    // validamos si existe el ID a actualizar
    const id = Number(req.params.id);
    const esEncontrado = await Anime.buscarPorId(id)
    if (!esEncontrado) {
      return res.status(404).json({
        message: `Anime ID ${id} no encontrado.`,
      });
    }

    const { nombre, genero, año, autor } = req.body;

    const nuevoAnime = {
      nombre: String(nombre),
      genero: String(genero),
      año: new Date(Number(año), 0).getFullYear(),
      autor: String(autor)
    };
    const resultado = await Anime.actualizar(id, nuevoAnime)
    res.status(200).json({
      message: resultado
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    })
  }
};

async function eliminarAnime(req, res) {
  try {
    const id = Number(req.params.id);
    const esEncontrado = await Anime.buscarPorId(id);
    if (!esEncontrado) {
      return res.status(404).json({
        message: `Anime con ID ${id} no encontrado.`,
      });
    }
    console.log(esEncontrado)
    const resultado = await Anime.eliminar(id);
    if (resultado) {
      return res.status(200).json({
        message: `Anime con ID ${id} ha sido eliminado exitosamente.`,
      });
    } else {
      return res.status(500).json({
        message: `Error al eliminar el anime con ID ${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const backend = {
  obtenerAnimes,
  obtenerUnAnime,
  obtenerAnimePorNombre,
  obtenerAnimesPorGenero,
  crearAnime,
  actualizarAnime,
  eliminarAnime,
};

module.exports = backend;

