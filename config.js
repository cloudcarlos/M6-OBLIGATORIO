const dotenv = require('dotenv').config();
const path = require('path');


/**
 * cargamos el metodo config , el objeto path,
 * y el archivo.env 
 */

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || '3000',
    
}