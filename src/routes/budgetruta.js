/**
 * Archivo de rutas de budgets
 * @author: Eder Lara T
 * Año: 2022
 */
'use strict';

// Cargar Express:
const express = require('express');
// Cargar el control:
const budgetControl = require('../controllers/budgetcontrol'); 
// Cargar Router de express:
const api = express.Router();
const mdAuth = require('../middleware/auth');

// Rutas:
/* ------------------------------------ Dimensiones ------------------------------------ */
api.get('/categoria/', mdAuth.loginSecure, budgetControl.getCategoria);
api.get('/periodo/', mdAuth.loginSecure, budgetControl.getPeriodo);
api.get('/mes/', mdAuth.loginSecure, budgetControl.getMes);

/* ------------------------------------ Conceptos ------------------------------------ */
api.post('/concepto/nuevo', mdAuth.loginSecure, budgetControl.setConcept);
api.get('/concepto/todos', mdAuth.loginSecure, budgetControl.getConceptAll);
api.get('/concepto/:idconcepto', mdAuth.loginSecure, budgetControl.getConcept);
api.get('/concepto/activos', mdAuth.loginSecure, budgetControl.getConceptActive);
api.put('/concepto/editar',mdAuth.loginSecure, budgetControl.updateConcept);
api.put('/concepto/desactivar', mdAuth.loginSecure, budgetControl.deactivateConcept);

/* ------------------------------------ Presupuesto ------------------------------------ */
api.post('/presupuesto/nuevo', mdAuth.loginSecure, budgetControl.crudPresupuesto);

module.exports = api;