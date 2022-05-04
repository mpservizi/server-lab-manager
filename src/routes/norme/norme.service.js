import model from './norme.model.js';
async function getAllNorme() {
  let result = [
    { id: 1, title: 'Norma 1' },
    { id: 2, title: 'Norma 2' },
    { id: 3, title: 'Norma 3' },
  ];
  model.listaNorme();
  return Promise.resolve(result);
}

export default {
  getAllNorme,
};
