const fs = require('fs');
import path from 'path';

/**
 * Definire qui oggetto config da usare in app
 */
function getConfig() {
  const ENV = leggiConfig();
  if (!ENV) {
    return undefined;
  }
  return {
    port: parseInt(ENV.PORT, 10) || 3000,
    database: {
      host: 'localhost',
      nome: ENV.DB_NAME,
      path: ENV.DB_PATH,
      fake: parseInt(ENV.FAKE, 10) || 0,
      debug: parseInt(ENV.DB_DEBUG, 10) || 0,
    },
    settings: {
      appName: ENV.APP_NAME,
    },
  };
}

/**
 * Legge config dal file json
 * @returns
 */
function leggiConfig() {
  const CONFIG_FILE_PATH = path.join(__dirname, '../', 'app_config.json');
  let result = undefined;
  try {
    let rawdata = fs.readFileSync(CONFIG_FILE_PATH);
    result = JSON.parse(rawdata);
  } catch (error) {
    console.log('Errore lettura config file');
    console.log(error);
  }
  return result;
}
export default { load: getConfig };
