/**
 * Aplicativo de manejo de gastos, controlador de budgets (CRUD)
 * @author: Eder Lara T
 * Año: 2022
 */
'use strict'

// Cargamos la configuración de la base de datos:
const conn = require('../config/database/conex');
let momento = require('moment');
let estados= require('../config/util/estados');

function budgetTest(req, res){
    let ahora = momento().format('LTS');
    res.status(200).send({
        Estado : estados.m200,
        prueba: 'Accediendo a la ruta de prueba de spendapp',
        HoraActual : ahora,
        feedback : estados
    })
}

/* *********************************** Controles de Budgets *********************************** */
function loginUser(req, res){

}

// Exportar:
module.exports = {
    budgetTest
}