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

/* *********************************** Controles de Budgets *********************************** */
function getCategoria(req, res){
    conn.query('SELECT * FROM categoria', (err, categoria)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  categoria})
    });
}

/* ------------------------------------ setConcept ------------------------------------ */
function setConcept(req, res){
    let params = req.body;

    let idconcepto = 0;
    let categoria = params.concepto;
    let idusuario = req.user.sub;             // capturamos el usuario logueado
    let idcategoria = params.categoria;

    const newConcept = { idconcepto, categoria, idusuario, idcategoria }
    
    conn.query('INSERT INTO concepto set ?', [newConcept], (err, nconcepto)=>{
        if (err) throw err;
        if(nconcepto){
            return res.status(200).send({ respuesta: newConcept })
        }else {
            return res.status(500).send({ respuesta: estados.m500});
        }
    })
}

/* ------------------------------------ getConcept ------------------------------------ */
function getConcept(req,res){
    let idusuario = req.user.sub;

    let sql = "SELECT * FROM concepto WHERE idusuario = "+idusuario+"";
    conn.query(sql, (err, conceptos)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  conceptos});
    });    
}


// Exportar:
module.exports = {
    getCategoria,
    setConcept,
    getConcept
}