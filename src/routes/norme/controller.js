import express from 'express';
const router = express.Router();
import Service from './service.js';

router.get('', async (req, res) => {
  let result = await Service.getAllNorme();
  res.send(result);
});
router.get('/:id', async (req, res) => {
  let id_norma = parseInt(req.params.id);
  let result = {
    id_palylod: id_norma,
  };
  res.send(result);
});

router.post('', async (req, res) => {
  let payload = req.body;
  let result = await Service.addNorma(payload);
  res.send(result);
});

router.patch('', async (req, res) => {
  let payload = req.body;
  let result = await Service.editNorma(payload);
  res.send(result);
});
router.delete('', async (req, res) => {
  let payload = req.body;
  let result = await Service.deleteNorma(payload);
  res.send(result);
});

export default router;
