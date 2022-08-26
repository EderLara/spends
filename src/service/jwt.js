/**
 * Archivo de JSON WEB TOKEN de usuario
 * @author: Eder Lara T
 * Año: 2022
 */
'use strict';

const jwt = require('jwt-simple');
const momento = require('moment');
require('dotenv').config();

// clave secreta de decodificaciòn de TOKEN:
const secret = process.env.SECRET;

// Funcion payload;
exports.createToken = function(user){
    // Objeto pyaload:
    let payload = {
        sub : user.idusuario, 
        nick: user.nickname, 
        name: user.nombreUsuario, 
        mail: user.emailUsuario, 
        bday: user.fechaNace,
        stat: user.estado,
        // Control de caducidad:
        fiat: momento().unix(),
        fexp: momento().add(2, 'days').unix()
    }
    // Encriptamos payload con llave secreta:
    return jwt.encode(payload, secret);
}