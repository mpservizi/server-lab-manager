import fs from 'fs';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE_PATH = path.join(__dirname, '../', 'app_config.json');

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
      path: setDbPath(ENV),
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

function setDbPath(config) {
  let percorso = '';
  if (config.RELATIVE_PATH && config.RELATIVE_PATH == 1) {
    let root_folder = path.dirname(CONFIG_FILE_PATH);
    percorso = path.join(root_folder, config.DB_PATH);
  } else {
    percorso = config.DB_PATH;
  }
  return percorso;
}
export default { load: getConfig };
