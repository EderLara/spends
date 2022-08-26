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

/* ------------------------------------ Conceptos ------------------------------------ */
api.post('/concepto/nuevo', mdAuth.loginSecure, budgetControl.setConcept);
api.get('/concepto/todos', mdAuth.loginSecure, budgetControl.getConcept);

module.exports = api;