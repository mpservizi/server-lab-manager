import model from './model.js';
async function getAllNorme() {
  let result = model.listaNorme();
  return Promise.resolve(result);
}

export default {
  getAllNorme,
};
