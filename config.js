const dotenv = require('dotenv');
const path = require('path');

/**
 * cargamos el metodo config , el objeto path,
 * y el archivo.env 
 */
dotenv.config({
    path: path.resolve(
        __dirname,process.env.NODE_ENV +'.env'
    )
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV_DEF || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '3000',
}