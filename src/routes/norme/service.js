import model from './model.js';
async function getAllNorme() {
  let result = model.getAll();
  return Promise.resolve(result);
}
async function addNorma(payload) {
  //TO do formattare i campi del payload in base ai campi della tabella
  payload = {};
  payload.Nome = 'xxx';
  payload.Anni = 32;
  let result = model.addNew(payload);
  return Promise.resolve(result);
}
async function editNorma(payload) {
  //TO do formattare i campi del payload in base ai campi della tabella
  payload = {};
  payload.Anni = 33;
  let result = model.editOne(payload);
  return Promise.resolve(result);
}
async function deleteNorma(payload) {
  //TO do formattare i campi del payload in base ai campi della tabella
  payload = {};
  payload.id = 52;
  let result = model.deleteOne(payload);
  return Promise.resolve(result);
}

export default {
  getAllNorme,
  addNorma,
  editNorma,
  deleteNorma,
};
