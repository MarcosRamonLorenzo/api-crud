// ...existing code...
# api-crud

Repositorio práctica Sistemas Distribuidos — API RESTful de ejemplo con Node.js, Express y MongoDB. Servidor HTTPS con protección mediante tokens JWT y middleware de autenticación.

## Resumen
- API CRUD genérica sobre colecciones de MongoDB.
- Autenticación por JWT (no hay endpoint de login en el ejemplo; se proporciona helper para generar tokens).
- Servidor usando HTTPS (certificados en /cert).
- Protección de rutas con middleware `AuthMiddleware.auth`.

## Principales ficheros
- `index.js` — rutas, arranque HTTPS, middlewares.
- `config.js` — variables de configuración (PORT, DB, TOKEN/SECRET, TOKEN_EXP_TIME).
- `helpers/token.helper.js` — funciones `TokenHelper.creaToken(payload)` y `TokenHelper.decodificaToken(token)`.
- `middlewares/auth.middleware.js` — `AuthMiddleware.auth` (valida Authorization: Bearer <token>).
- `cert/cert.pem`, `cert/key.pem` — certificados auto-firmados.
- `crud.postman_collection.json`, `SD.postman_collection.json` — colecciones Postman.

## Requisitos
- Node.js (>= 16)
- MongoDB corriendo (por defecto `mongodb://127.0.0.1:27017/SD`)

## Instalación
```sh
npm install
```

## Configuración
Variables disponibles (en `config.js` o mediante variables de entorno):
- PORT — puerto HTTPS (ej. `4000`)
- DB — URI de MongoDB (`mongodb://127.0.0.1:27017/SD`)
- TOKEN / SECRET — secreto para firmar/verificar JWT
- TOKEN_EXP_TIME — tiempo de expiración del token (según implementación)

Ajusta usando variables de entorno o editando `config.js`.

## Gestión de tokens (JWT)
- Generación: `TokenHelper.creaToken(userObj)` devuelve un JWT firmado (se recomienda usar `{ _id: user._id }` como payload/sub).
- Verificación: `TokenHelper.decodificaToken(token)` valida el token y devuelve (o rechaza) el sub/ID del usuario.
- No hay endpoint de login en el proyecto; integra `TokenHelper.creaToken` en tu flujo de autenticación para emitir tokens a clientes.

Ejemplo mínimo:
```js
const TokenHelper = require('./helpers/token.helper');
const token = TokenHelper.creaToken({ _id: 'USER_ID' });
console.log(token);
```

## Middleware de autenticación
- `AuthMiddleware.auth` comprueba la cabecera `Authorization: Bearer <JWT>`.
- Si falta/invalid token devuelve 401 con mensaje.
- Añadir `AuthMiddleware.auth` a las rutas que se quieran proteger (en `index.js` ya está aplicado a las rutas `/api`).

## Endpoints principales (en `index.js`)
- GET /api — lista nombres de colecciones (protegido)
- GET /api/:coleccion — lista documentos (protegido)
- GET /api/:coleccion/:id — obtiene documento por _id (protegido)
- POST /api/:coleccion — inserta documento (protegido)
- PUT /api/:coleccion/:id — actualiza documento (protegido)
- DELETE /api/:coleccion/:id — elimina documento (protegido)

Nota: `app.param('coleccion', ...)` coloca `req.collection` con la colección indicada.

## Uso / Ejemplos
Arrancar:
```sh
npm start
```
Ejemplo curl (ignorar verificación de certificado auto-firmado con `-k`):
```sh
curl -k -H "Authorization: Bearer <TU_JWT>" https://localhost:4000/api
```
POST protegido:
```sh
curl -k -X POST https://localhost:4000/api/product \
  -H "Authorization: Bearer <TU_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"mi producto","price":200}'
```

## Postman
Cargar `crud.postman_collection.json` o `SD.postman_collection.json` y configurar la cabecera Authorization (Bearer token).

## Certificados locales
El servidor usa `cert/cert.pem` y `cert/key.pem`. Son auto-firmados; para pruebas use `curl -k` o agregue el certificado a confianza del sistema.

## Notas
- Helmet y CORS están configurados en `index.js`.
- La API usa `mongojs` para acceso a MongoDB.
- Añade un endpoint de login si quieres emitir tokens desde el propio servidor.

## Licencia
ISC
// ...existing code...