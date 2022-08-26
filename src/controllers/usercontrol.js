/**
 * Aplicativo de manejo de gastos, controlador de usuarios (CRUD)
 * @author: Eder Lara T
 * Año: 2022
 */
'use strict';

// Cargamos la configuración de la base de datos:
const conn = require('../config/database/conex');
const jwt = require('../service/jwt');
let momento = require('moment');
let estados= require('../config/util/estados');
let boton = require('../config/util/boton');
let ahora = momento().format('LTS');


function userTest(req, res){  
    res.status(200).send({
        Estado : estados.m200,
        prueba: 'Accediendo a la ruta de prueba de Usuarios',
        HoraActual : ahora,
        feedback : estados
    })
}

/* *********************************** Controles de Usuario *********************************** */
function setUser(req,res){
    // cuerpo de formulario:
    let params = req.body;

    // atributos de la tabla:
    let nickname = params.nickname;
    let password = params.password;
    let nombre = params.nombre;
    let email = params.email;
    let fechaNace = params.fechanace;
    let creado_el = momento().format();
    let modificado_el = momento().format();
    let imgUsuario = 'default.png';                                                     // Nombre de la imagen
    // acción de boton:
    let accion = boton.create;

    // construcción de query:
    let sql = "call crudUsuario(0, '"+nickname+"', '"+password+"', '"+nombre+"', '"+email+"', '"+fechaNace+"', '"+imgUsuario+"', '"+creado_el+"', '"+modificado_el+"', '"+accion+"')";
    conn.query(sql, (err, resulset)=>{
        if (err) throw err;
        if (resulset.length > 0){
            let querySet = resulset[0];
            return res.status(200).send({
                respuesta : querySet[0]
            })
        }else {
            return res.status(500).send({
                mensaje : estados.m500
            });
        }
    });
}

/* ------------------------------------ loginUser ------------------------------------ */
function loginUser(req, res){
    const params = req.body;
    let nickuser = params.usuario;
    let passuser = params.password;

    const sql = "call loginUser('"+nickuser+"', '"+passuser+"')";

    conn.query(sql, (err, response)=>{
        if (err) throw err;
        if (!response){
            return res.status(500).send({ mensaje : estados.m500 });
        }
        if (response.length > 0){
            let resultado = response[0];
            if (resultado[0].mensaje === 'NoAuth'){
                return res.status(200).send({
                    respuesta : 'Usuario y/o contraseña incorrectos'
                });
            } else {
                return res.status(200).send({
                    token : jwt.createToken(resultado[0])
                });
            }
        }
    })
}

/* ------------------------------------ setImage ------------------------------------ */
function setImage(req,res){
    /*
    // Con el manejador de archivos vamos a cargar una imagen:
    let imgLoad = req.files.imagen.path;                                        // Con esto tenemos la imagen que adjuntamos al body
    let fileSplit = imgLoad.split('src\\statics\\images\\usuarios\\');          // Cortamos la ruta del archivo y le dejamos solo el nombre
    if (fileSplit == undefined){
        let imagen = fileSplit[1];
    }else{
        let imagen = 'default.png';
    }
    */
    // let fileExt = imagen.split('\.');                                                // Corto por el . para traer la ext del archivo
    // fileExt = fileExt[1];
}

/* ------------------------------------ GetImage ------------------------------------ */
function getImagen(req, res){
    // Variable del nombre de la imagen:
    let imagenFile = req.params.imagenFile;             // Pasamos el nombre del archivo a la ruta
    // Variable con la ruta del archivo:
    let pathFile = '.\/src\/statics\/images\/usuarios\/'+imagenFile;
    console.log(pathFile);
    // Validamos la existencia del archivo:
    try {
        // Variable para confirmar la existencia:
        let existe = fs.statSync(pathFile);
        let archivo = existe.isFile();
        console.log(archivo, existe);
        // Condicionamos la respuesta:
        if(existe && archivo){
            res.sendFile(path.resolve(pathFile));
        }else {
            return res.status(404).send({
                mensaje: 'Error, imagen no encontrada'
            });
        }
    } catch (error) {
        return res.status(404).send({
            mensaje: estados.m404
        })
    }
}

// Exportar:
module.exports = {
    userTest,
    setUser,
    loginUser
}