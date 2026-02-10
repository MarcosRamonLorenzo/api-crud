"use strict";

const port = process.env.PORT || 3000;

const express = require("express");
const logger = require("morgan");

const app = express();

// Declaramos los middleware
app.use(logger("dev")); // probar con: tiny, short, dev, common, combined

//Middleware para interpetar HTTP request.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Implementamos el API RESTFul a través de los métodos
app.get("/api/product", (req, res) => {
  res.status(200);
  res.send({ productos: [] });
});

app.get("/api/product/:productID", (req, res) => {
  const productID = req.params.productID;

  res.status(200);
  res.send({ producto: productID });
});

app.post("/api/product", (req, res) => {
  
const product = req.body;

  console.log(product);

  res.status(200);

  res.send({ mensaje: "Producto creado", producto: product,});
});

app.put("/api/product/:productID", (req, res) => {
  const queProducto = req.body;
  const productID = req.params.productID;

  res.status(200);
  res.send({mensaje: `Se ha modificado el producto ${productID}`,producto: queProducto,});
});

app.delete("/api/product/:productID", (req, res) => {
  const productID = req.params.productID;

  res.status(200);
  res.send({ mensaje: `Se ha eliminado el producto ${productID}`});
});

// Lanzamos nuestro servicio API
app.listen(port, () => {
  console.log(`API REST ejecutándose en http://localhost:${port}/api/product`);
});
