const rispostaDefault = {
  data: ['Risposta default dal db'],
  err: undefined,
};

export class MyDb {
  _config;

  constructor(dbConfig) {
    this._config = dbConfig;
  }
  /**
   * Inizzializzare qui il database
   */
  async initDb() {
    return Promise.resolve(true);
  }
  /**
   * Inizzializzare qui il database
   */
  getPath() {
    return 'Percorso del db ????';
  }
  /**
   * Query selezione
   * @param {Object} payload
   * @returns
   */
  query(payload) {
    return Promise.resolve(rispostaDefault);
  }
  /**
   * Query azione, insert,update,delete
   * @param {Object} payload
   * @returns
   */
  execute(payload) {
    return Promise.resolve(rispostaDefault);
  }
}
