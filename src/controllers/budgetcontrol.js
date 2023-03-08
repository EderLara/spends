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
let boton = require('../config/util/boton');

/* *********************************** Controles de Budgets *********************************** */

/* ------------------------------------ getCategoria ------------------------------------ */
function getCategoria(req, res){
    conn.query('SELECT * FROM categoria', (err, categoria)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  categoria})
    });
}

/* ------------------------------------ getPeriodo ------------------------------------ */
function getPeriodo(req, res){
    conn.query('SELECT * FROM periodo order by idperiodo desc', (err, periodo)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  periodo})
    });
}

/* ------------------------------------ getMes ------------------------------------ */
function getMes(req, res){
    conn.query('SELECT * FROM mes', (err, mes)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  mes})
    });
}

/* ------------------------------------ setConcept ------------------------------------ */
function setConcept(req, res){
    let params = req.body;

    let idconcepto = 0;
    let categoria = params.concepto;
    let idusuario = req.user.sub;                           // capturamos el usuario logueado
    let idcategoria = params.categoria;

    const newConcept = { idconcepto, categoria, idusuario, idcategoria }
    
    conn.query('INSERT INTO concepto set ?', [newConcept], (err, nconcepto)=>{
        if (err) throw err;
        if(nconcepto){
            return res.status(200).send({ respuesta: nconcepto })
        }else {
            return res.status(500).send({ respuesta: estados.m500});
        }
    });
}

/* ------------------------------------ getConceptAll ------------------------------------ */
function getConceptAll(req,res){
    let idusuario = req.user.sub;

    let sql = "SELECT * FROM concepto WHERE idusuario = "+idusuario+"";
    conn.query(sql, (err, conceptos)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  conceptos});
    });    
}

/* ------------------------------------ getConceptActive ------------------------------------ */
function getConceptActive(req,res){
    let idusuario = req.user.sub;

    let sql = "SELECT * FROM concepto WHERE idusuario = "+idusuario+" and estado = 'Activos'";
    conn.query(sql, (err, conceptos)=>{
        if (err) throw err;
        return res.status(200).send({ respuesta :  conceptos});
    });    
}

/* ------------------------------------ getConceptActive ------------------------------------ */
function getConcept(req,res){
    let idconcepto =  req.params.idconcepto;
    let idusuario = req.user.sub;

    let sql = "SELECT * FROM concepto WHERE idconcepto ="+idconcepto+" and idusuario = "+idusuario;

    conn.query(sql, (err, concepto)=>{
        if (err) throw err;
        if (concepto) {
            return res.status(200).send({ respuesta : concepto});
        }
    });    
}

/* ------------------------------------ updateConcept ------------------------------------ */
function updateConcept(req, res){
    let params = req.body;

    let idconcepto = params.idconcepto;
    let categoria = params.concepto;
    let estado = params.estado;
    let idusuario = req.user.sub;                           // capturamos el usuario logueado
    let idcategoria = params.categoria;

    const sql = "UPDATE concepto set categoria = '"+categoria+"', idcategoria = '"+idcategoria+"' WHERE idconcepto = "+idconcepto+" and idusuario = "+idusuario;
    
    conn.query(sql, (err, mconcepto)=>{
        if (err) throw err;
        if(mconcepto){
            return res.status(200).send({ respuesta: mconcepto })
        }else {
            return res.status(500).send({ respuesta: estados.m500});
        }
    });
}

/* ------------------------------------ v ------------------------------------ */
function deactivateConcept(req, res){
    let params = req.body;

    let idconcepto = params.idconcepto;
    let categoria = params.concepto;
    let estado = params.estado;
    let idusuario = req.user.sub;                           // capturamos el usuario logueado
    let idcategoria = params.categoria;

    estado === 'Activo' ? estado = 'Inactivo' : estado = 'Activo';

    const sql = "UPDATE concepto set estado = '"+estado+"' WHERE idconcepto = "+idconcepto+" and idcategoria = "+idcategoria+" and idusuario = "+idusuario;
    
    conn.query(sql, (err, mconcepto)=>{
        if (err) throw err;
        if(mconcepto){
            return res.status(200).send({ respuesta: mconcepto })
        }else {
            return res.status(500).send({ respuesta: estados.m500});
        }
    });
}

/* ------------------------------------ crudPresupuesto ------------------------------------ */
function crudPresupuesto(req, res){
   
    let params = req.body;
    let idpresupuesto = 0;
    let valorPresupuesto = params.valorpresupuesto;
    let creado_el = momento().format();
    let modificado_el = momento().format();
    let idperiodo = params.periodo;
    let idmes  = params.idmes;
    let concepto = params.concepto;
    let idusuario = req.user.sub;
    let accion = boton.create;

    let sql = "call spendsapp.crudPresupuesto("+idpresupuesto+","+valorPresupuesto+",'"+creado_el+"','"+modificado_el+"', "+idperiodo+", "+idmes+", "+concepto+", "+idusuario+",'"+accion+"')";
    conn.query(sql, (err, presupuesto)=>{ 
        if (err) throw err;
        if (presupuesto){
            let response = presupuesto[0];
            return res.status(200).send({ respuesta :  response });
        }else {
            return res.status(500).send({ respuesta :  estados.m500 });
        }
    });

}

/* ------------------------------------ modifyPresupuesto ------------------------------------ */


// Exportar:
module.exports = {
    getCategoria,
    getPeriodo,
    getMes,
    setConcept,
    getConceptAll,
    getConceptActive,
    getConcept,
    updateConcept,
    deactivateConcept,
    crudPresupuesto
}