# Frontend Mercadolibre

Url productiva: http://ec2-18-208-149-131.compute-1.amazonaws.com:3000/items?search=ipad

### Esta es la app de front para la [REST API](https://github.com/briannovillo/meli-api/)

#### Cosas que se tuvieron en cuenta al hacer esta app (y algunas que me hubiera gustado implementar pero quedaron en el tintero por falta de tiempo)

- [x] La app es universal/isomórfica, es decir tiene *Server Side rendering*, que es escencial para el SEO ya que los buscadores recién se estan adaptando a crawlear sitios con render solo en el cliente y no es del todo fiable, además de que no funcionarían los previews de metadata cuando compartimos la url en una red social.
- [x] *Hot reloading* en dev para que se vea al instante el cambio de un archivo, ya que agiliza mucho el desarrollo.
- [x] *Minificado de html* cuando se buildea en prod.
- [x] *Classes css ofuscadas* para reducir el tiempo de parseo del dom, y el tamaño de los css.
- [x] Se utilizó *Redux* como manejador de estado de la aplicación
- [x] Se agregó *ESLint* para estandarizar el estilo del código.
- [ ] Agregar tests con Jest/Enzyme
- [ ] Hacer navegación interna de React con componentes Link en lugar de con tags <a> para aprovechar mejor los dispatch de Saga
- [ ] Encarar el maquetado de html y css de forma Mobile first.
- [ ] Poner el CSS critico al principio para la carga Above the fold.

> Este repo se creo en base a [este boilerplate](https://github.com/william-woodhead/simple-universal-react-redux) ya que al tener visibilidad de varias personas en la comunidad esta mas depurado que uno que creemos nosotros mismos y si ocurre algun error en el futuro posiblemente este reportado alli tambien. Solo hay que tener en cuenta que aqui se actualizaron todas las librerias a la ultima version stable y se cambió thunk por Saga que permite manejar mejor flujos complejos de estado.

#### Para iniciar el proyecto en un entorno local

1. Clonar repositorio e instalar dependencias
```
git clone https://github.com/briannovillo/meli-front.git
npm install
```

2. Correr el server con hot reloading (En este modo los estilos se cargan del scss directamente, por eso se ve un parpadeo durante un segundo) 
```
npm run start:dev
```

O en modo producción (con css y js buildeados)
```
npm run start:prod
```

#### Otra documentación útil extraída del boilerplate sobre como es el flujo de Server Side Rendering.

* Todo empieza con la creación del server de Express dentro de *src/server/index.js*

Aquí se puede ver que todos los requests son enviados a la función handleRender():
```
app.use(handleRender);
```

La función handleRender hace varias cosas:

1. Crea un store de redux para cada request
2. Matchea la ruta de req.path con las rutas especificadas en el router de la app (en el archivo src/universal/routes.js)
3. Ejecuta la función loadData() si es que esa ruta tiene una declarada para obtener los datos necesarios para el render.
4. Genera el html con la función renderToString() de react-dom/server
5. Llama a la función renderFullPage() para unir el html y el state de Redux
6. Envía la respuesta al cliente con res.send()

Por último en el cliente que está dentro del archivo *src/client/index.js* se crea un store de Redux para el cliente basado en el state que nos dió el server y se usa la función Hydrate() para actualizar los componentes de React.

#### Estructura del proyecto

```
meli-front
├── dist --> Archivos compilados de la app con babel y webpack
├── loaders --> Loaders de babel
│   ├── sass-loader.js --> Loaders necesarios para parsear archivos scss
│   └── scope-name.js --> Se llama en .babelrc para crear clases css ofuscadas
├── package.json --> Lista las dependencias y comandos disponibles de npm
├── package-lock.json --> Versiones estatificadas de las dependencias npm
├── README.md --> Info del proyecto
├── src
│   ├── client
│   │   └── index.js -> Crea el store de Redux para el cliente en base al state que vino del servidor
│   ├── components --> Componentes de React con sus estilos
│   │   ├── app
│   │   │   ├── App.js
│   │   │   ├── App.scss
│   │   │   └── index.js
│   │   ├── breadcrumb
│   │   │   ├── Breadcrumb.js
│   │   │   ├── Breadcrumb.scss
│   │   │   └── index.js
│   │   ├── notFound
│   │   │   ├── index.js
│   │   │   ├── NotFoundIcon.js
│   │   │   ├── NotFound.js
│   │   │   └── NotFound.scss
│   │   ├── productDetail
│   │   │   ├── index.js
│   │   │   ├── ProductDetail.js
│   │   │   └── ProductDetail.scss
│   │   ├── productsList
│   │   │   ├── index.js
│   │   │   ├── ProductsListItem.js
│   │   │   ├── ProductsListItem.scss
│   │   │   ├── ProductsList.js
│   │   │   └── ProductsList.scss
│   │   ├── searchBox
│   │   │   ├── index.js
│   │   │   ├── SearchBox.js
│   │   │   ├── SearchBox.scss
│   │   │   ├── SearchButton.js
│   │   │   └── SearchButton.scss
│   │   └── searchResults
│   │       ├── index.js
│   │       ├── SearchResults.js
│   │       └── SearchResults.scss
│   ├── config
│   │   └── default.json --> Configuraciones por defecto
│   ├── containers --> Containers que conectan los componentes a Redux
│   │   ├── App.js
│   │   ├── BreadCrumb.js
│   │   ├── NotFound.js
│   │   ├── ProductDetail.js
│   │   ├── SearchBox.js
│   │   └── SearchResults.js
│   ├── redux
│   │   ├── reducers --> Reducers que modifican el store de Redux en base a acciones
│   │   │   ├── index.js
│   │   │   └── modules
│   │   │       └── product.js
│   │   ├── sagas --> Crea acciones saga para que sean escuchadas por los reducers
│   │   │   ├── index.js
│   │   │   └── modules
│   │   │       └── product.js
│   │   └── services
│   │       ├── Api.js --> Clase generica de Api Isomorfica para que la puedan usar tanto el server como el cliente para hacer requests
│   │       └── modules
│   │           └── product.js --> Hace los fetch de productos
│   ├── server --> Instanciacion del server
│   │   ├── handleRender.js --> Devuelve el primer render del server
│   │   ├── index.js --> Inicia el server de Express
│   │   └── renderFullPage.js --> Genera html con el store de Redux incluido en el dom para el cliente
│   └── universal
│       ├── createReduxStore.js --> Crea el Store de redux que comparten el server y el cliente
│       └── routes.js --> Rutas de Express
├── webpack.config.dev.js --> Configuración de Webpack para dev
└── webpack.config.prod.js --> Configuración de Webpack para prod
```
