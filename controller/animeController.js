const fs= require('fs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');


// ACCESO A DATABASE animes.json
const rutaDatabase = path.resolve(__dirname,'../database/animes.json'); 

const leerDatabase = async () => {
    let data = fs.readFileSync(rutaDatabase, 'utf8');
    data = JSON.parse(data);
    return data;
};

const guardarDatabase = async (data) => {
    let dataActualizada = JSON.stringify(data,null,4);
    fs.writeFileSync(rutaDatabase, dataActualizada);
    return true;
};

// CONTROLLER FRONTEND

const mostrarTodos = async (req,res) => {
    try{
        const data = await leerDatabase();
        //return res.send({data});
        res.render('home', {
            title: 'Bienvenido a Api Animes',
            h1 : 'Todos los Animes',
            dataCards: data, 
        });
    } catch(error){
        console.error(error);
        res.status(500).send({
            message:'Internal server error',
            error: error.message
        });
    };
};

const mostrarDetalles = async (req, res) => {
    try{
        let data = await leerDatabase();
        const id = req.params.id || req.query.id;
        data = new Map(Object.entries(data));

        if (!data.has(id)){
            res.status(404).send({
                message:"No existe el anime.",
            });
        }

        let anime = data.get(id);
        anime = {id, ...anime}

        //res.send(anime);
        res.render("details_anime", {
            title: 'Detalles del Anime',
            h1: 'Detalles del Anime',
            jsonData : anime
        });
        
    } catch(error){
        console.error(error);
        res.status(500).send({
            message:'Internal server error',
            error: error.message
        });
    }
}

const agregarAnime = async (req, res) => {

    try{
        let data = await leerDatabase();
        const listado = Object.values(data).flatMap(anime => anime.genero);
        const generos = [ ...new Set(listado)];
        res.render("new_anime", {
            title: 'Nuevo Anime',
            h1: 'Ingreso de un nuevo Anime',
            data: {
                submitText: 'Nuevo Anime',
                generos,
            },
        });
    } catch(error) {
        console.error(error);
        res.status(500).send({
            message:'Internal server error',
            error: error.message
        });
    };
};

const mostrarFormularioBusqueda = async (req, res) => {
    try{    
        res.render('search', {
            title: 'Busqueda Api Animes',
            h1: 'Busqueda de Animes',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message:'Internal server error',
            error: error.message
        });
    };
}

const mostrarResultadoBusqueda = async (req, res) => {
    try{
        let data = await leerDatabase();
        const palabraBuscada = req.params.palabra || req.query.palabra;

        const arrayAnimesEncontrados = Object.entries(data).filter( ([clave,anime]) => {
            //listado almacena los anime que coincidan con la busqueda
            // si el id es o el nombre son iguales a la busqueda.
            const listado = (clave === palabraBuscada) || (anime.nombre.toLowerCase().includes(palabraBuscada.toLowerCase()));
            return listado;
        });

        const resultados = Object.fromEntries(arrayAnimesEncontrados);
        
        if(Object.keys(resultados).length === 0){
            res.status(404).send({
                message:"No existe el anime.",
            });
        }

        res.render('search', {
            title: 'Busqueda resuelta',
            h1: 'Resultados de Animes',
            palabra: palabraBuscada,
            dataCards: resultados,
        });
        //res.send(resultados);

    } catch(error) {
        console.error(error);
        res.status(500).send({
            message:'Internal server error',
            error: error.message
        });
    }
}

const editarAnime = async (req, res) => {
    try{
        let data = await leerDatabase();
        
        const id = req.params.id;

        const mapData = new Map(Object.entries(data));

        if (!mapData.has(id)){
            res.status(404).send({
                message:"No existe el anime.",
            });
        }

        let anime = mapData.get(id);
        anime = { id, ...anime}
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

        const generosSeleccionados = generosDisponibles.map( genero => ({
            nombre: genero,
            seleccionado: generosAsignados.includes(genero)
        }));
        
        res.render("edit_anime", {
            title: 'Edicion del Anime',
            h1: 'Edicion del Anime',
            data: {
                dataForm: anime ,
                submitText: 'Editar Anime',
                generosForm: generosSeleccionados
            },
        });
        //res.send(generosSeleccionados);
    } catch(error){
        res.status(500).send({
            error: "error 500 "+ error,
        });
    }
}

// CONTROLLER BACKEND
// obtener todos los animes
const obtenerAnimes = async (req, res) => {
    try{
        let data = await leerDatabase();
        data = await JSON.parse(data);
        res.status(201).send({
            code: 201,
            message: 'Todos los anime.::',
            data,
        });
    } catch(error) {
        res.status(500).send({
            code: 500,
            message: 'Internal server error.::',
            error
        })
    }
}

const obtenerUnAnime = async (req, res) => {
    try{
        let data = await leerDatabase();
        data = await JSON.parse(data);
        const id = req.params.id || req.query.id;
        
        const mapData = new Map(Object.entries(data));

        if(!mapData.has(id)){
            res.status(404).send({
                message:"No existe el anime.",
            });
        }

        let anime = mapData.get(id);
        anime = {id, ...anime} 
        res.status(201).send({
            code: 201,
            message: 'anime.::',
            anime,
        });
    } catch(error) {
        console.error(error);
        res.status(500).send({
            message:'Internal server error',
            error: error.message
        });
    }
};

const crearAnime = async (req, res) => {
    try{
        const nuevoAnime = req.body;
        const nuevoId = uuidv4();

        let data = await leerDatabase();
        data = new Map(Object.entries(data));
        data.set(nuevoId,nuevoAnime);
        
        //para guardar la data actualizada, debe de volver a ser un objeto javascript, y no un objeto map
        let response = await guardarDatabase( Object.fromEntries(data) );
        res.status(201).send({
            code: 201,
            message: 'Anime creado exitosamente. ::',
            response: response
        });
    } catch(error) {
        res.status(500).send({ 
            code: 500,
            message: 'Internal server error al crear nuevo anime.::',
            error:error
        });
    }
}

const actualizarAnime = async (req, res) => {

    try{

        const nuevaData = req.body;
        const id = req.params.id || req.query.id
        let data = await leerDatabase();
        data = new Map(Object.entries(data));

        if(!data.has(id)){
            res.status(404).send({
                code:404,
                message:"No existe el anime.",
                id: id,
            });
        }
        
        data.set(id,nuevaData);
        const response = await guardarDatabase( Object.fromEntries(data) );

        res.status(201).send({
            code: 201,
            message: `El anime con ID ${id}, ha sido actualizado exitosamente.::`,
            response : response,
        });
    } catch(error){
        res.status(500).send({ 
            code: 500,
            message: 'Internal server error al actualizar  anime.::',
            error: error,
        });
    };
    //prueba 2
    /* let data = await leerDatabase();
    data = JSON.parse(data);
    const mapData = new Map( Object.entries(data));

    const id = req.params.id;
    if(!mapData.has(id)){
        res.status(404).send({
            code: 404,message:`No existe un anime con el Id ${id}.`
        });
    }
    try{
        let anime = mapData.get(id);
        anime = {...anime,...req.body};
        mapData.set(id,anime);
        const updatedData = Object.fromEntries(mapData);
        await guardarDatabase(updatedData);
        res.status(200).send({
            code: 201,
            message:'Actualizado correctamente.',
            data: anime,
        });
    } catch(error) {
            res.status(500).send({
                error: "error 500"+ error,
            });
    }; */
};

const eliminarAnime = async (req, res) => {
    
    try{
        
        const id = req.params.id;
        let data = await leerDatabase();
        const mapData = new Map(Object.entries(data));

        if(!mapData.has(id)){
            return res.status(404).json({code : '404', 
            message: `No se encuentra ningun anime con ese ID.`,
            id: id,
            });
        };

        mapData.delete(id);
        const response = await guardarDatabase( Object.fromEntries(mapData));
        res.status(201).send({
            code: 201,
            message: `El anime con ID ${id}, ha sido eliminado exitosamente.::`,
            response : response,
        });
    } catch(error) {
        res.status(500).send({ 
            code: 500,
            message: 'Internal server error al borrar  anime.::',
            error: error,
        });
    };
};

module.exports = {
    mostrarTodos,
    mostrarDetalles, 
    agregarAnime,
    mostrarFormularioBusqueda,
    mostrarResultadoBusqueda,
    editarAnime,
    obtenerAnimes,
    obtenerUnAnime,
    crearAnime,
    actualizarAnime,
    eliminarAnime,
}

