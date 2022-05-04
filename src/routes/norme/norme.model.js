import { DbAdapter } from './../../db.js';
async function listaNorme() {
  let sql = `SELECT * FROM norme`;
  let result = await DbAdapter.selectQuery(sql);
  console.log(result);
}

export default {
  listaNorme,
};
