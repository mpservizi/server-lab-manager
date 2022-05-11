/**
 * Entry point di node app.
 */
import Server from './server.js';
import { logger } from './logger.js';
import Config from './config.js';
import Repo from './../storage/index.js';
import { initRouter } from './routes/index.js';

/**
 * Entry point per node app, eseguire qui tutta la configurazione globale
 * @returns
 */
export async function startApp() {
  let result = {
    data: undefined,
    config: undefined,
    err: undefined,
  };

  try {
    //Se caricare file dev.env oppure .env
    const DEV_MODE = true;

    //Carico enviorment vars
    const config = Config.load(DEV_MODE);
    if (config.err) {
      result.err = config.err;
      result.data = 'Errore loading enviorment variabiles. Check env file';
      return result;
    }

    if (DEV_MODE) {
      logger.debug('Dev env file loaded');
    } else {
      logger.debug('Production Env file loaded');
    }

    //Inizzializzo il repository
    const repoResult = await Repo.initRepo(config.database);
    if (repoResult.err) {
      result.err = repoResult.err;
      result.data = 'Errore inizializzazione repository';
      return result;
    }

    logger.debug(repoResult.data);

    //Creo express app senza farla partire
    const app = Server.initServer();

    //Carico tutti i routes del app
    // const modResult = await initRouter(app, Repo.getDb());
    // if (modResult.err) {
    //   result.err = modResult.err;
    //   result.data = 'Errore inizializzazione moduli';
    //   return result;
    // }

    // logger.debug(modResult.data);

    //Faccio partire il server express
    const response = await Server.startServer(app, config.port);
    if (response.err) {
      result.err = response.err;
      result.data = 'Errore avvio server';
      return result;
    }

    // set risposta mandata dal avvio server
    result.data = response.data;
    //espongo oggetto config
    // result.config = config;
  } catch (error) {
    //Errore non gestito
    result.err = error;
  }

  return result;
}
