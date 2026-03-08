# API CRUD - Sistemas Distribuidos

*API RESTful de ejemplo para la asignatura de Sistemas Distribuidos.
Implementada con **Node.js**, **Express** y **MongoDB**, con soporte
para **HTTPS**, **CORS**, **Helmet** y autenticación mediante
**token**.*

Esta API permite realizar operaciones CRUD sobre cualquier colección de
la base de datos MongoDB.

------------------------------------------------------------------------

# Endpoints del API

  -------------------------------------------------------------------------------
                      Verbo HTTP Ruta                    Descripción
  ------------------------------ ----------------------- ------------------------
      [GET] /api                    Obtiene todas las
                                                         colecciones existentes
                                                         en la base de datos.

      [GET] /api/{coleccion}        Obtiene todos los
                                                         documentos de la
                                                         colección indicada.

      [GET]/api/{coleccion}/{id}   Obtiene un documento
                                                         específico por su ID.

      [POST] /api/{coleccion}        Inserta un nuevo
                                                         documento en la
                                                         colección (requiere
                                                         token).

      [PUT]/api/{coleccion}/{id}   Actualiza un documento
                                                         existente (requiere
                                                         token).

      [DELETE] /api/{coleccion}/{id}   Elimina un documento por
                                                         ID (requiere token).
  -------------------------------------------------------------------------------

------------------------------------------------------------------------

# Comenzando 🚀

Estas instrucciones te permitirán ejecutar el proyecto en tu máquina
local para desarrollo y pruebas.

------------------------------------------------------------------------

# Pre-requisitos 📋

Debes tener instalado:

-   **Node.js (\>=16)**
-   **MongoDB**
-   **npm**

### Instalación en Ubuntu 22.04

Instalar Node.js:

``` sh
sudo apt update
sudo apt install npm
sudo npm clean -f
sudo npm i -g n
sudo n stable
```

Instalar MongoDB:

``` sh
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
```

------------------------------------------------------------------------

# Instalación 🔧

Clonar el repositorio:

``` sh
git clone https://tu-repositorio.git
```

Entrar en el proyecto:

``` sh
cd api-crud
```

Instalar dependencias:

``` sh
npm install
```

------------------------------------------------------------------------

# Configuración ⚙️

La configuración del servidor se encuentra en el archivo:

    config.js

Parámetros principales:

  Variable   Descripción
  ---------- ---------------------------------------------
  PORT       Puerto donde se ejecuta el servidor
  DB         URI de conexión a MongoDB
  TOKEN      Token necesario para operaciones protegidas

Ejemplo:

``` javascript
module.exports = {
 PORT: 3000,
 DB: "mongodb://127.0.0.1:27017/SD",
 TOKEN: "123456"
};
```

------------------------------------------------------------------------

# Ejecución del servidor ▶️

Para iniciar el servidor:

``` sh
npm start
```

La API quedará disponible en:

    https://localhost:3000/api

⚠️ El servidor utiliza **HTTPS**, por lo que requiere certificados en:

    /cert/cert.pem
    /cert/key.pem

------------------------------------------------------------------------

# Autenticación 🔐

Las operaciones **POST, PUT y DELETE** requieren enviar un **token en la
cabecera HTTP**.


Si no se envía el token o es incorrecto, el servidor responderá con:

    401 Unauthorized

------------------------------------------------------------------------

# Ejemplo de petición

Crear un documento:

``` bash
curl -X POST https://localhost:3000/api/product \
-H "Content-Type: application/json" \
-H "token: 123456" \
-d '{"name":"producto1","price":200,"category":"general"}'
```

------------------------------------------------------------------------

# Pruebas con Postman 📯

El repositorio incluye colecciones de pruebas:

    crud.postman_collection.json
    SD.postman_collection.json

Para usarlas:

1.  Abrir **Postman**
2.  Seleccionar **Import**
3.  Cargar el archivo JSON
4.  Ajustar el puerto si es necesario

------------------------------------------------------------------------

# Despliegue 📦

El servidor se ejecuta mediante **HTTPS** usando certificados SSL
definidos en:

    cert/cert.pem
    cert/key.pem

Estos certificados se cargan en el servidor mediante el módulo `https`
de Node.js.

------------------------------------------------------------------------

# Construido con 🛠️

-   **Express** -- Framework web para Node.js\
-   **MongoDB** -- Base de datos NoSQL\
-   **mongojs** -- Driver de MongoDB para Node.js\
-   **cors** -- Middleware para permitir peticiones entre dominios\
-   **helmet** -- Seguridad mediante cabeceras HTTP\
-   **morgan** -- Logger de peticiones HTTP\
-   **https** -- Servidor seguro en Node.js

------------------------------------------------------------------------

# Versionado 📌

Se utiliza **SemVer** para el control de versiones.

  Versión   Descripción
  --------- -------------------------------------
  v1.0      API básica
  v2.0      API CRUD sin base de datos
  v3.0      API CRUD con MongoDB
  v3.1      Seguridad básica
  v3.2      Seguridad y autenticación con token

------------------------------------------------------------------------

# Autor ✒️

Proyecto desarrollado para la asignatura **Sistemas Distribuidos** por **Marcos Ramón Lorenzo**.

------------------------------------------------------------------------

