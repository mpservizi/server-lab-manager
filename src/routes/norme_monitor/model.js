import { DbAdapter } from '../../db.js';
async function listaNorme() {
  let sql = `SELECT * FROM norme`;
  // let result = await DbAdapter.selectQuery(sql);
  let result = {
    data: [{ id: 1, nome: 'Malkit' }],
  };
  return result;
}

export default {
  listaNorme,
};
