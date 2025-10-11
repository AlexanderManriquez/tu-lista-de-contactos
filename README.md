# Tu lista de contactos

Repositorio de ejemplo para una aplicación simple de administración de contactos hecha con Node.js, Express y Handlebars. Permite ver, agregar, editar y eliminar contactos (almacenados en JSON local).

## Contenido

- `app.js` - archivo principal que arranca el servidor Express.
- `package.json` - dependencias y scripts.
- `routes/` - rutas de la aplicación (`contactsRoutes.js`).
- `controllers/` - lógica de acceso y modificación de contactos.
- `views/` - plantillas Handlebars (UI).
- `public/` - activos públicos (CSS y JS cliente como SweetAlert2).
- `data/` - archivos JSON donde se almacenan los contactos (`contacts.json`) y `lastId.json`.

## Requisitos previos

- Node.js (recomendado: versión LTS actual, por ejemplo Node 18). Si no estás seguro, instala una versión LTS.
- npm (viene con Node.js).

Nota: Asumo que estás en Windows y usas PowerShell (powershell.exe). Los comandos siguientes están escritos para esa shell.

## Instalación

1. Abre una terminal en la carpeta raíz del repositorio (donde está `package.json`).

2. Instala las dependencias con npm:

```powershell
npm install
```

Esto instalará las dependencias listadas en `package.json` (por ejemplo `express`, `express-handlebars` y `sweetalert2`) y las dependencias de desarrollo (`nodemon`).

## Ejecutar la aplicación

- Modo desarrollo (con recarga automática usando `nodemon`):

```powershell
npm run dev
```

- Modo producción / ejecución normal:

```powershell
npm start
```

Por defecto el servidor escucha en el puerto 3000. Abre en tu navegador:

[http://localhost:3000](http://localhost:3000)

Rutas principales:

- `/` - página de inicio.
- `/contacts` - lista y acciones sobre contactos (añadir, editar, eliminar).

## Estructura y funcionamiento breve

- El servidor usa Express y Handlebars como motor de vistas.
- Los datos de los contactos se guardan en archivos JSON dentro de `data/`. Las operaciones CRUD se realizan leyendo/escribiendo esos archivos con `fs` (sin base de datos externa).
- La carpeta `public/` contiene JS cliente (por ejemplo `alertMessage.js` y `confirmDelete.js`) y estilos.
- `sweetalert2` se usa en el frontend para mostrar alertas bonitas.

## Dependencias principales

- express: framework web para Node.js. Maneja enrutamiento y middleware.
- express-handlebars: motor de plantillas Handlebars para renderizar vistas del servidor.
- sweetalert2: librería cliente para modales/alertas (se usa en el frontend).

DevDependency:

- nodemon: reinicia automáticamente la app cuando detecta cambios (útil en desarrollo). Se define en `package.json` en `devDependencies` y se ejecuta con `npm run dev`.

## Configuración del entorno de trabajo

- Instala Node.js LTS y usa `npm install` en la raíz para instalar dependencias.
- No se requiere archivo `.env` en la versión actual del proyecto. El puerto está actualmente configurado en `app.js` como `const PORT = 3000;`.

Si quieres usar una variable de entorno para el puerto (recomendado en despliegues), cambia esa línea por:

```js
const PORT = process.env.PORT || 3000;
```

y luego puedes iniciar la app en PowerShell con:

```powershell
$env:PORT=4000; npm start
```

o en una sola línea (PowerShell):

```powershell
($env:PORT = 4000) -and (npm start)
```

## Notas y buenas prácticas

- Los datos se guardan en archivos JSON; para producción se recomienda usar una base de datos (SQLite, PostgreSQL, MongoDB, etc.) si se necesita concurrencia y persistencia más segura.
- Asegúrate de tener permisos de escritura en la carpeta `data/` (el servidor escribe `contacts.json`).
- Si `nodemon` no funciona por permiso local, puedes instalarlo globalmente `npm i -g nodemon` (opcional), aunque no es obligatorio si usas `npm run dev` porque npm ejecuta la versión local.
