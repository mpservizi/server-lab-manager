import express from 'express';
const router = express.Router();
import Service from './norme.service.js';

router.get('', async (req, res) => {
  let result = await Service.getAllNorme();
  res.send(result);
});

export default router;
