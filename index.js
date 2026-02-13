'use strict';

// --- Declaraciones y Configuración ---
const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de Base de Datos (Base de datos: "SD")
var db = mongojs("mongodb://127.0.0.1:27017/SD");
const id = mongojs.ObjectID; 

// --- Middlewares ---
app.use(logger('dev')); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 


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
app.post('/api/:coleccion', (req, res, next) => {
    const elemento = req.body;

    if (!elemento.nombre) {
        res.status(400).json({
            error: 'Bad data',
            description: 'Se precisa al menos el campo "nombre"'
        });
    } else {
        req.collection.save(elemento, (err, elementoGuardado) => {
            if (err) return next(err);
            res.json(elementoGuardado);
        });
    }
});

// 5. Actualizar un elemento (por ID)
app.put('/api/:coleccion/:id', (req, res, next) => {
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
app.delete('/api/:coleccion/:id', (req, res, next) => {
    const elementoId = req.params.id;

    req.collection.remove({ _id: id(elementoId) }, (err, resultado) => {
        if (err) return next(err);
        res.json(resultado);
    });
});

// --- Inicio del Servidor ---
app.listen(port, () => {
    console.log(`\n🚀 API REST funcionando en: http://localhost:${port}/api`);
    console.log(`Uso: http://localhost:${port}/api/{nombre_coleccion}/{id_opcional}`);
});