const app = require("./src/app")
const { exec } = require('child_process');
//archivo config para sumar variables de entorno
const config = require('./src/config.js');

// iniciamos el servidor 
app.listen(config.PORT, () =>{
    console.log(`mamma mia! servidore inicciate e port ${config.PORT}.::`);
    const abrirHome = process.platform === 'win32' ? 'start' : 'open';
    //exec(`${abrirHome} http://${config.HOST}:${config.PORT}/`);
});