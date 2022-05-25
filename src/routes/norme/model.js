import { DbAdapter } from '../../db.js';
import sql from 'sql-query';
const sqlQuery = sql.Query();

const TABELLA = 'norme';

async function getAll() {
  let sql = `SELECT * FROM ${TABELLA}`;
  let result = await DbAdapter.selectQuery(sql);
  return result;
}

async function addNew(payload) {
  const sqlInsert = sqlQuery.insert();
  let sql = sqlInsert.into('nomi').set(payload).build();
  let result = await DbAdapter.insertQuery(sql);
  if (result.data) {
    payload.id = result.data[0].id;
    return payload;
  }
  return result;
}

async function editOne(payload) {
  const sqlUpdate = sqlQuery.update();
  let sql = sqlUpdate.into('nomi').set(payload).build();
  let result = await DbAdapter.updateQuery(sql);
  if (result.data) {
    payload.id = result.data[0].id;
    return payload;
  }
  return result;
}

async function deleteOne(payload) {
  let sql = `DELETE from nomi WHERE ID=${payload.id}`;
  let result = await DbAdapter.deleteQuery(sql);
  console.log(result);
  return result;
}

export default {
  getAll,
  addNew,
  editOne,
  deleteOne,
};
