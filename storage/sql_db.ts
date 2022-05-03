import { MyDb } from '@models/MyDb';
import { existsSync } from 'fs';
import { DbPayload_I, DbRisposta_I } from '@models/interfacce/db_dto';

import { open as DbCnn } from 'node-adodb';
import { logger } from '@src/logger';
const ADODB = require('node-adodb');

class SqlDb extends MyDb {
  private _cnn: DbCnn | undefined;
  constructor(dbConfig: any) {
    super(dbConfig);
  }

  async initDb() {
    let cnn = await openConnection(this._config.path);
    if (cnn) {
      this._cnn = cnn;
      return true;
    }
    return false;
  }
  getPath() {
    return this._config.path;
  }

  /**
   * Query selezione
   * @param {Object} payload
   * @returns
   */
  async query(payload: DbPayload_I) {
    let result: DbRisposta_I = {
      data: undefined,
      err: undefined,
    };
    try {
      if (this._config.debug) {
        logger.info('Db query : ' + payload.sql);
      }
      let dati = await this._cnn!.query(payload.sql);
      result.data = dati;
    } catch (error: any) {
      result.err = {
        msg: 'Errore esecuzione select query',
        payload: payload,
        error: error.process.message,
      };
    }
    return result;
  }
  /**
   * Query azione, insert,update,delete
   * @param {Object} payload
   * @returns
   */
  async execute(payload: DbPayload_I) {
    let result: DbRisposta_I = {
      data: undefined,
      err: undefined,
    };
    try {
      if (this._config.debug) {
        logger.info('Db execute : ' + payload.sql);
        logger.info('scalar : ' + payload.scalar);
      }
      let dati = await this._cnn!.execute(payload.sql, payload.scalar);
      result.data = dati;
    } catch (error: any) {
      result.err = {
        msg: 'Errore esecuzione action query',
        payload: payload,
        error: error.process.message,
      };
    }
    return result;
  }
}

export default SqlDb;

/**
 * Inizializza la connessione con il database
 * @param {String} dbPath : percorso del dataabse
 * @returns {Object} connessione al database. Null in caso di errore
 */

async function openConnection(dbPath: string) {
  // const provider = "Microsoft.Jet.OLEDB.4.0"; //.mdb
  const provider = 'Microsoft.ACE.OLEDB.12.0'; //.accdb office 2010

  let conStr =
    'Provider=' +
    provider +
    ';Data Source=' +
    dbPath +
    ';Persist Security Info=False;';
  // console.log(conStr);
  try {
    if (!existsSync(dbPath)) {
      logger.error('Percorso database non valido : ' + dbPath);
      return null;
    }

    let connection = await verificaDriver(conStr);
    if (!connection) {
      logger.error('Errore collegamento al db.Connection string = ');
      logger.error(conStr);
    }
    return connection;
  } catch (error) {
    logger.error('Errore nel openConnection al database');
    logger.error(error);
    return null;
  }
}

/**
 * Crea il driver per connetersi al database
 * @param {String} conStr
 * @returns {Object} driver oppure null
 */
async function verificaDriver(conStr: string) {
  //Con alcune verizioni di office funziona 32 bit con altre 64bit
  //Provo entrambe le versioni e verifico se una delle 2 funziona
  let is64Bit = false;
  let cnn = ADODB.open(conStr, is64Bit);
  //verifico la connessione
  let esito = await checkConnection(cnn);
  if (esito) {
    return cnn;
  }
  //Se non ha funzionato la precedente configurazione, cambio architerruta driver
  is64Bit = !is64Bit;
  cnn = ADODB.open(conStr, is64Bit);
  //verifico la connessione, restituisco null in caso d'errore
  esito = await checkConnection(cnn);
  if (esito) {
    return cnn;
  }
  return null;
}

/**
 * Indica se il diriver riesce a connettersi al database
 * @param {Object} cnn :  ADODB connection
 * @returns
 */
async function checkConnection(cnn: DbCnn) {
  //Provo eseguire una query di selezione su una tabella finta
  const FAKE_TABLE = 'NOMI_XXXXXX';
  let test_sql = `SELECT id from ${FAKE_TABLE}`;
  let result = false;
  try {
    let dati = await cnn.query(test_sql);
    //Se la tabella esiste e ho estratto i dati
    result = true;
  } catch (error: any) {
    //Se il testo d'errore contiene nome della tabella
    //Significa che il driver funziona, errore indica che la tabella non esiste
    if (error.process.message.includes(FAKE_TABLE)) {
      result = true;
    }
    //In altri casi d'errore il driver non riesce a connetersi al db
  }
  return result;
}
