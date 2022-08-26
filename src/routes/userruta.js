/**
 * Archivo de rutas de usuario
 * @author: Eder Lara T
 * Año: 2022
 */

// Cargar Express:
const express = require('express');
// Cargar el control:
const userControl = require('../controllers/usercontrol'); 
// Cargar Router de express:
const api = express.Router();

// Rutas:
api.get('/testuser', userControl.userTest);
api.post('/usuario/nuevo', userControl.setUser);
api.post('/usuario/ingreso', userControl.loginUser);


module.exports = api;