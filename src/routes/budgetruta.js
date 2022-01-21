/**
 * Archivo de rutas de budgets
 * @author: Eder Lara T
 * Año: 2022
 */

// Cargar Express:
const express = require('express');
// Cargar el control:
const budgetControl = require('../controllers/budgetcontrol'); 
// Cargar Router de express:
const api = express.Router();

// Rutas:
api.get('/testbudget', budgetControl.budgetTest);


module.exports = api;