import { startApp } from './index.js';
import { logger } from './logger.js';
/**
 * Bootstap node app
 */
async function avvio() {
  let result = await startApp();
  if (!result.err) {
    logger.info(result.data);
  } else {
    logger.error('Errore inizializzazione applicazione. Err:');
    logger.error(result.err);
  }
}

avvio();
