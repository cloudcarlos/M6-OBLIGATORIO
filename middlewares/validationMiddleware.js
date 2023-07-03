const { body, validationResult } = require('express-validator');

const validarAnimeForm = [
    body('nombre')
        .notEmpty().withMessage('El campo nombre es requerido.')
        .trim()
        .isLength( { max: 100 }).withMessage('El campo nombre debe tener como máximo 100 caracteres.'),
    /* body('autor')
        .notEmpty().withMessage('El campo autor es requerido.')
        .trim()
        .isLength( { max: 100 }).withMessage('El campo autor debe tener como máximo 100 caracteres.'),
    body('estudio')
        .notEmpty().withMessage('El campo estudio es requerido.')
        .trim()
        .isLength( { max: 100 }).withMessage('El campo estudio debe tener como máximo 100 caracteres.'),
    body('protagonistas')
        .notEmpty().withMessage('El campo protagonistas es requerido.')
        // como protagonistas es un listado, hay q usar un metodo custom
        .custom( value => {
            const protagonistas = value.split(',').map(item => item.trim());
            return protagonistas.length > 0 && protagonistas.length <= 5;
        }).withMessage('Debes ingresar al menos 1 protagonista y como maximo 5.'),
    body('genero')
        .notEmpty().withMessage('Debes seleccionar al menos 1 genero')
        .isArray({ max:5}).withMessage('Debes seleccionar como maximo 5 generos'), */
];

const validarForm = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        req.body.errors =  errorMessages;
    }
    next();
};

module.exports = {
    validarAnimeForm,
    validarForm,
}
