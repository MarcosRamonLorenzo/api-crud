'use strict';

// Imports.
const config = require('./config'); 
const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');
const https = require('https'); 
const fs = require('fs'); 
const helmet = require('helmet'); 

const cors = require('cors'); 


// Declaraciones.

const app = express();

const port = config.PORT;
const urlDB = config.DB;
const accessToken = config.TOKEN;


// Configuración de Base de Datos (Base de datos: "SD")
var db = mongojs(urlDB);
const id = mongojs.ObjectID; 

//Declaraciones.

var allowCrossTokenOrigin = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*"); // Permiso a cualquier URL. Mejor acotar
    return next();
};

var allowCrossTokenMethods = (req, res, next) => {

    res.header("Access-Control-Allow-Methods", "*"); // Mejor acotar (GET,PUT,POST,DELETE)
    return next();
};

var allowCrossTokenHeaders = (req, res, next) => {

    res.header("Access-Control-Allow-Headers", "*"); // Mejor acotar
    return next();
};


// --- Middlewares ---

app.use(cors());
app.use(helmet());
app.use(allowCrossTokenOrigin);
app.use(allowCrossTokenMethods);
app.use(allowCrossTokenHeaders);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var auth = (req, res, next) => { // declaramos la función auth
    
    if (!req.headers.token) { // si no se envía el token...
        res.status(401).json({ result: 'KO', msg: "Envía un código válido en la cabecera 'token'" });
        return;
    };

    const queToken = req.headers.token; // recogemos el token de la cabecera llamada “token”

    if (queToken === accessToken) { // si coincide con nuestro password...
        return next(); // continuamos con la ejecución del código
    } else { // en caso contrario...
        res.status(401).json({ result: 'KO', msg: "No autorizado" });
        return;
    }
};

app.param("coleccion", (req, res, next, coleccion) => {
    console.log('Middleware param /api/:coleccion ->', coleccion);
    req.collection = db.collection(coleccion);
    return next();
});

// --- Rutas de la API ---

// 1. Listar todas las colecciones disponibles
app.get('/api', (req, res, next) => {
    db.getCollectionNames((err, colecciones) => {
        if (err) return next(err);
        res.json(colecciones);
    });
});

// 2. Listar todos los elementos de una colección
app.get('/api/:coleccion', (req, res, next) => {
    req.collection.find((err, documentos) => {
        if (err) return next(err);
        res.json(documentos);
    });
});

// 3. Obtener un elemento específico por su ID
app.get('/api/:coleccion/:id', (req, res, next) => {
    req.collection.findOne({ _id: id(req.params.id) }, (err, elemento) => {
        if (err) return next(err);
        res.json(elemento);
    });
});

// 4. Insertar un nuevo elemento
app.post('/api/:coleccion', auth, (req, res, next) => {
    const nuevoElemento = req.body;
    
    req.collection.save(nuevoElemento, (err, coleccionGuardada) => {
        if (err) return next(err);
        res.json(coleccionGuardada);
    });
});

// 5. Actualizar un elemento (por ID)
app.put('/api/:coleccion/:id', auth, (req, res, next) => {
    const elementoId = req.params.id;
    const elementoNuevo = req.body;

    req.collection.update(
        { _id: id(elementoId) },
        { $set: elementoNuevo },
        { safe: true, multi: false },
        (err, resultado) => {
            if (err) return next(err);
            res.json(resultado);
        }
    );
});

// 6. Eliminar un elemento (por ID)
app.delete('/api/:coleccion/:id', auth, (req, res, next) => {
    const elementoId = req.params.id;

    req.collection.remove({ _id: id(elementoId) }, (err, resultado) => {
        if (err) return next(err);
        res.json(resultado);
    });
});

// --- Inicio del Servidor ---
// Lanzamos el servicio mediante un canal seguro
https.createServer({

    cert: fs.readFileSync('./cert/cert.pem'),
    key: fs.readFileSync('./cert/key.pem')

}, app).listen(port, function () {
    console.log(`\n🚀 API REST funcionando en: https://localhost:${port}/api`);
});