# api-crud
Repositorio práctica Sistemas Distribuidos

API RESTful de ejemplo para la asignatura de Sistemas Distribuidos. Implementada con Node.js, Express y MongoDB.

## Requisitos
- Node.js (>= 16)
- MongoDB en ejecución (por defecto usa `mongodb://127.0.0.1:27017/SD`)

## Instalación
```sh
npm install
```

## Configuración
- Puerto por defecto: 3000 (puede cambiarse con la variable de entorno `PORT`)
- URI de MongoDB por defecto: `mongodb://127.0.0.1:27017/SD`

## Ejecutar
```sh
npm start
```
El servidor arranca y expone la API definida en [index.js](index.js) (`app`). La conexión con la base de datos está en la variable [`db`](index.js) y los IDs usan [`id`](index.js).

## Endpoints principales
- GET /api
  - Lista las colecciones disponibles.
- GET /api/:coleccion
  - Lista todos los documentos de la colección.
- GET /api/:coleccion/:id
  - Obtiene un documento por su _id (ObjectID).
- POST /api/:coleccion
  - Inserta un nuevo documento. Debe incluir al menos el campo `nombre`.
- PUT /api/:coleccion/:id
  - Actualiza un documento por _id.
- DELETE /api/:coleccion/:id
  - Elimina un documento por _id.

Ejemplo curl (POST):
```sh
curl -X POST http://localhost:3000/api/product \
  -H "Content-Type: application/json" \
  -d '{"name":"mi producto","price":200,"category":"general"}'
```

## Colecciones Postman
- [crud.postman_collection.json](crud.postman_collection.json)
- [SD.postman_collection.json](SD.postman_collection.json)

## Licencia