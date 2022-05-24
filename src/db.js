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

//Esegue query di selezione
async function eseguiSelectQuery(payload) {
  try {
    let db = Storage.getDb();
    //Db crea il wrapper per errore con try catch
    let response = await db.query(payload);
    return response;
  } catch (error) {
    return creaRispostaErrore(error);
  }
}

//Esegue query di modifica
async function eseguiActionQuery(payload) {
  try {
    let db = Storage.getDb();
    //Db crea il wrapper per errore con try catch
    let response = await db.execute(payload);
    return response;
  } catch (error) {
    return creaRispostaErrore(error);
  }
}

function creaRispostaErrore(error) {
  return {
    err: {
      msg: 'Errore nel ricavare istanza del db',
      error: error,
    },
  };
}

export const DbAdapter = {
  selectQuery,
  updateQuery,
  deleteQuery,
  insertQuery,
};
