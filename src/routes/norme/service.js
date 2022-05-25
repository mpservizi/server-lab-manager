import model from './model.js';
async function getAllNorme() {
  let result = await model.getAll();
  return Promise.resolve(result);
}
async function findById(payload) {
  let id_norma = parseInt(payload);
  let result = await model.getById(id_norma);
  return Promise.resolve(result);
}

async function addNorma(payload) {
  checkDatePayload(payload);
  let result = await model.addNew(payload);
  return Promise.resolve(result);
}
async function editNorma(payload) {
  checkDatePayload(payload);
  let result = await model.editOne(payload);
  return Promise.resolve(result);
}
async function deleteNorma(payload) {
  //TO do formattare i campi del payload in base ai campi della tabella
  payload = {};
  payload.id = 52;
  let result = await model.deleteOne(payload);
  return Promise.resolve(result);
}

//Verifica se sono indicate le date nel payload.
function checkDatePayload(payload) {
  //elimina il campo data in caso di testo vuoto
  if (payload.entry_date == '') {
    payload.entry_date = null;
  }
  if (payload.exit_date == '') {
    payload.exit_date = null;
  }
}

export default {
  getAllNorme,
  addNorma,
  editNorma,
  deleteNorma,
  findById,
};
