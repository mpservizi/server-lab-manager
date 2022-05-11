import { DbAdapter } from './../db.js';

//Ogni routes corrisonde al canale websocket
const routes = {
  getAll: 'norme/getAll',
};

//Abbino gli handler ai routes
export const norme_handlers = {
  [routes.getAll]: listaNorme,
};

async function listaNorme() {
  let sql = `SELECT * FROM norme`;
  let result = await DbAdapter.selectQuery(sql);
  return result;
}
