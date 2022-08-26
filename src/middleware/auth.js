/**
 * Archivo de JSON WEB TOKEN de usuario
 * @author: Eder Lara T
 * Año: 2022
 */
 'use strict';

 const jwt = require('jwt-simple');
 const momento = require('moment');
 require('dotenv').config();

 let estados = require('../config/util/estados');
 let secret = process.env.SECRET;

 // Validaciòn de token:

 exports.loginSecure = function(req, res, next){
    // Validaciòn de token válido:
    if(!req.headers.authorization){
        return res.status(403).send({ mensaje : estados.m403 });
    }

    // Payload
    let payload;
    // variable token para cabecera:
    let token = req.headers.authorization.replace(/['"]+/g, '');
    token = token.replace('Bearer ', '');

    try {
        payload = jwt.decode(token, secret);
        // validaciòn de tiempo de expiraciòn:
        if(payload.fexp <= momento.unix()){
            return res.status(401).send({ mensaje : estados.m401 });
        }
    } catch (error) {
        return res.status(404).send({
            mensaje : 'EL token no es válido!!'
        });
    }
    
    req.user  = payload;
    next();
 }
