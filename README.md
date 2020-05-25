# PoC for React SSR with Material-UI

- [x] La app es universal/isomórfica, es decir tiene *Server Side rendering*, que es escencial para el SEO ya que los buscadores recién se estan adaptando a crawlear sitios con render solo en el cliente y no es del todo fiable, además de que no funcionarían los previews de metadata cuando compartimos la url en una red social.
- [x] *Hot reloading* en dev para que se vea al instante el cambio de un archivo, ya que agiliza mucho el desarrollo.
- [x] *Minificado de html* cuando se buildea en prod.
- [x] *Classes css ofuscadas* para reducir el tiempo de parseo del dom, y el tamaño de los css.
- [x] Se agregó *ESLint* para estandarizar el estilo del código.

#### Para iniciar el proyecto en un entorno local

1. Clonar repositorio e instalar dependencias
```
git clone https://github.com/briannovillo/react-front.git
npm install
```

2. Correr el server con hot reloading
```
npm run start:dev
```

O en modo producción (con css y js buildeados)
```
npm run start:prod
```

#### Como es el flujo de Server Side Rendering.

* Todo empieza con la creación del server de Express dentro de *src/server/index.js*

Aquí se puede ver que todos los requests son enviados a la función handleRender():
```
app.use(handleRender);
```

La función handleRender hace varias cosas:

1. Crea un store para cada request
2. Matchea la ruta de req.path con las rutas especificadas en el router de la app (en el archivo src/universal/routes.js)
3. Ejecuta la función loadData() si es que esa ruta tiene una declarada para obtener los datos necesarios para el render.
4. Genera el html con la función renderToString() de react-dom/server
5. Llama a la función renderFullPage() para unir el html y el initial state
6. Envía la respuesta al cliente con res.send()

Por último en el cliente que está dentro del archivo *src/client/index.js* se levanta el state que nos dió el server y se usa la función Hydrate() para actualizar los componentes de React.

#### Estructura del proyecto

```
react-front
├── dist --> Archivos compilados de la app con babel y webpack
├── loaders --> Loaders de babel
│   ├── sass-loader.js --> Loaders necesarios para parsear archivos scss
│   └── scope-name.js --> Se llama en .babelrc para crear clases css ofuscadas
├── package.json --> Lista las dependencias y comandos disponibles de npm
├── package-lock.json --> Versiones estatificadas de las dependencias npm
├── README.md --> Info del proyecto
├── src
│   ├── client
│   │   └── index.js -> Crea el store para el cliente en base al state que vino del servidor
│   ├── components --> Componentes de React con sus estilos
│   ├── config
│   │   └── default.json --> Configuraciones por defecto
│   ├── server --> Instanciacion del server
│   │   ├── handleRender.js --> Devuelve el primer render del server
│   │   ├── index.js --> Inicia el server de Express
│   │   └── renderFullPage.js --> Genera html con el store incluido en el dom para el cliente
│   └── universal
│       └── routes.js --> Rutas de Express
├── webpack.config.dev.js --> Configuración de Webpack para dev
└── webpack.config.prod.js --> Configuración de Webpack para prod
```
