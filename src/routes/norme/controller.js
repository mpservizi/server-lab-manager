import express from 'express';
const router = express.Router();
import Service from './service.js';

//Funziona
router.get('', async (req, res) => {
  let result = await Service.getAllNorme();
  res.send(result);
});
//Funziona
router.get('/:id', async (req, res) => {
  let result = await Service.findById(req.params.id);
  res.send(result);
});

//Funziona
router.post('', async (req, res) => {
  let payload = req.body;
  let result = await Service.addNorma(payload);
  res.send(result);
});

//Funziona
router.patch('', async (req, res) => {
  let payload = req.body;
  let result = await Service.editNorma(payload);
  res.send(result);
});

//Funziona
router.delete('', async (req, res) => {
  let payload = req.body;
  let result = await Service.deleteNorma(payload);
  res.send(result);
});

export default router;
