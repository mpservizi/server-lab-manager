/**
 * Adapter per evitare percorsi lunghi per esporre il db nei models
 * Il metodo espone l'intanza della classa MyDb
 * Qunado verrà implementato SqlExpress server basta cam
 */
import Storage from './../storage/index.js';

async function selectQuery(sql) {
  let payload = {
    sql: sql,
    scalar: undefined,
  };
  let response = await eseguiSelectQuery(payload);
  return response;
}
async function updateQuery(sql) {
  let payload = {
    sql: sql,
    scalar: undefined,
  };
  let response = await eseguiActionQuery(payload);
  return response;
}
async function deleteQuery(sql) {
  let payload = {
    sql: sql,
    scalar: undefined,
  };
  let response = await eseguiActionQuery(payload);
  return response;
}
async function insertQuery(sql) {
  let payload = {
    sql: sql,
    scalar: undefined,
  };
  let response = await eseguiActionQuery(payload);
  return response;
}

async function eseguiSelectQuery(payload) {
  let db = Storage.getDb();
  let response = await db.query(payload);
  return response;
}

async function eseguiActionQuery(payload) {
  let db = Storage.getDb();
  let response = await db.execute(payload);
  return response;
}

export const DbAdapter = {
  selectQuery,
  updateQuery,
  deleteQuery,
  insertQuery,
};
