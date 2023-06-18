import { getAll,getOne } from '../models/animeModel.js';

const getAllAnimes = async (req,res) => {
    try{
        const animes = await getAll();
        res.status(200).json(animes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener animes.'});
    }
};

const getAnimeById = async (req,res) => {
    try{
        const anime = await getOne(id)

    }
};

const getAnimeByName = async (req,res) => {

}

const createAnime = async (req,res) => {

};

const updateAnime = async (req,res) => {

};

const deleteAnime = async (req,res) => {

};
