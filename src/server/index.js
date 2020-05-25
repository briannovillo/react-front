import Express from 'express';
import config from '../config/default';
import handleRender from './handleRender';

const app = Express();
const { port } = config.server;

// Set server static folder
app.use('/dist', Express.static('dist'));

// Register routes handler
app.use(handleRender);

// Listen out for incoming requests
app.listen(port, () => {
  console.log('App listening on port', port);
});
