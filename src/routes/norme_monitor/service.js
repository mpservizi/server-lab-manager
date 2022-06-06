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
  if (payload.parent_id == '' || payload.parent_id == undefined) {
    payload.parent_id = null;
  }
  let result = await model.addNew(payload);
  return Promise.resolve(result);
}
async function editNorma(payload) {
  checkDatePayload(payload);
  let result = await model.editOne(payload);
  return Promise.resolve(result);
}
async function deleteNorma(payload) {
  let id_norma = parseInt(payload.id);
  let result = await model.deleteOne(id_norma);
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
