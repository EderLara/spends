/**
 * Archivo de utilidades del aplicativo
 * por lo general son diccionarios con mensajes
 * @author: Eder Lara
 */

'use strict';

let mensajes = {
        m200: 'La petición se ha completado correctamente',
        m400: 'Error de Registro: Se deben llenar los campos obligatorios',
        m401: 'Petición Expirada!',
        m403: 'La petición no se puede procesar, error de autenticación',
        m404: 'No se han encontrado resultados',
        m405: 'No se pudo seguir debido a errores de semántica',
        m408: 'Se ha agotado el tiempo de para ejecutar la acción',
        m409: 'Ya se encuentra registrado en la base de datos',
        m500: 'Ha ocurrido un error en la petición a la base de datos, revise las conexiones'
    }

module.exports = mensajes;