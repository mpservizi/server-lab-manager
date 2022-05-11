import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { logger } from './logger.js';
import { createServer } from 'http';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import MyWebsocket from './websocket.js';

//Inizializza app express
function initServer() {
  const app = express();
  const PUBLIC_FOLDER = join(__dirname, '..', 'public');

  // app.use(morgan('tiny'));
  app.use(
    morgan(function (tokens, req, res) {
      let msg = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' ');

      logger.debug('My Log : ' + msg);
      // return msg;
    })
  );
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));

  //request body in json
  app.use(bodyParser.json());

  // set cors
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', '*');
    // console.log(req.path);
    next();
  });

  //La cartella assets è raggiungibile con path res nei scripts
  app.use('/', express.static(PUBLIC_FOLDER));

  return app;
}

// Avvia server express
async function startServer(app, port) {
  return new Promise(function (resolve, reject) {
    let result = {
      data: '',
      err: null,
    };
    try {
      const httpServer = createServer(app);
      MyWebsocket.initWebsocket(httpServer);
      app.set('port', port);
      httpServer.listen(port, function () {
        result.data = `http://localhost:${port}`;
        resolve(result);
      });
      // app
      //   .listen(port, () => {
      //     result.data = `http://localhost:${port}`;
      //     resolve(result);
      //   })
      //   .on('error', (err) => {
      //     result.err = err;
      //     resolve(result);
      //   });
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  initServer,
  startServer,
};
