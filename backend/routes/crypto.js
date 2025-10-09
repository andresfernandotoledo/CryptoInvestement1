import express from 'express';
import { getCryptos, getCryptoPrices } from '../controllers/cryptoController.js';

const router = express.Router();

router.get('/cryptos', getCryptos);
router.get('/cryptos/:id/prices', getCryptoPrices);

export default router;
