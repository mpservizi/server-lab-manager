import express from 'express';
const router = express.Router();
import NormeController from './norme/controller.js';
import NormeMonitorController from './norme_monitor/controller.js';

//Prefisso da mettere prima di caricare i vari routes dei moduli
const ROUTE_PREFIX = '/api';
/**
 * Inizializza tutti i moduli del app
 * @param app : Express app
 * @param {MyDb} db : MyDb instanza
 */
export async function initRouter(app, db) {
  let result = {
    data: '',
    err: null,
  };
  try {
    bindRoutes();
    result.data = 'Moduli inizializzati correttamente';
  } catch (error) {
    result.err = error;
  }
  app.use(ROUTE_PREFIX, router);
  return Promise.resolve(result);
}

function bindRoutes() {
  router.use('/norme', NormeController);
  router.use('/norme_monitor', NormeMonitorController);
}
