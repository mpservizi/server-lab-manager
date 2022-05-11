import { DbAdapter } from './../db.js';

//Ogni routes corrisonde al canale websocket
export const routes_Norme = {
  getAll: 'norme/getAll',
};

//Abbino gli handler ai routes
export const norme_handlers = {
  [routes_Norme.getAll]: listaNorme,
};

async function listaNorme() {
  let sql = `SELECT * FROM norme`;
  let result = await DbAdapter.selectQuery(sql);
  return result;
}
