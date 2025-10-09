import express from 'express';
import cors from 'cors';
import cryptoRoutes from './routes/crypto.js';
import { updatePrices } from './controllers/cryptoController.js';
import { initializeCryptos } from './scripts/fillcryptos.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', cryptoRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeCryptos(); // inicializa criptos al arrancar
  setInterval(updatePrices, 60000); // actualizar cada 1 minuto
});
