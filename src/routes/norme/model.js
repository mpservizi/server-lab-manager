import { DbAdapter } from '../../db.js';
async function listaNorme() {
  let sql = `SELECT * FROM norme`;
  let result = await DbAdapter.selectQuery(sql);
  return result;
}

export default {
  listaNorme,
};
