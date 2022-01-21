/**
 * En este archivo encontramos la configuración de la conexión a la base de datos,
 * se estructura el control para esta conexión.
 * 
 * @author: Eder Lara Trujillo
 */
'use strict';

// Cargamos la libreria de MySQL:
const mysql = require('mysql');
// Cargamos el modulo de promesas de NodeJS:
const { promisify } = require('util');

// Cargamos los parametros de la base de datos:
const { database } = require('./dbparams');

// Creamos la función de conexión usando createPool, porque es mas eficiente:
const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Server DataDB: Se ha desconectado la base de datos, revise la conexión al servicio');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Server DataDB: La base de datos tiene muchas peticiones o conexiones establecidas');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Server DataDB: La base de datos no se ha podido conectar');
        }
    }
    if ( connection ) connection.release();
        console.log('Server DataDB: Establecida la conexión a la base de datos');
        return;
});

// Convertimos en promesas las consultas a la base de datos:
pool.query = promisify(pool.query);

// Exportamos el módulo:
module.exports = pool;