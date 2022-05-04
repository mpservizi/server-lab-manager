/**
 * Impostare qui il database da usare nel app
 */

import SqlDb from './sql_db.js';

let database;
/**
 * Espone il database da usare nel app
 * @param config
 * @returns
 */
async function initRepo(config) {
  let result = {
    data: null,
    config: null,
    err: null,
  };
  //   if (config.database.fake == 1) {
  //     database = new MemoryDb();
  //     result.data = "Memory database pronto";
  //   } else {
  //     database = new SqlDb();
  //     result.data = "Sql database pronto";
  //   }
  database = new SqlDb(config);
  let esito = await database.initDb();
  if (esito) {
    result.data = 'Sql database pronto : ' + database.getPath();
  } else {
    result.err = 'Errore connessione al database';
  }
  return result;
}

export default {
  initRepo,
  getDb: () => {
    return database;
  },
};
