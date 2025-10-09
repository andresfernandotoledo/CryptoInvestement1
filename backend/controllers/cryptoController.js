import axios from 'axios';
import db from '../models/db.js';
import dotenv from 'dotenv';
dotenv.config();

const CMC_HEADERS = { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY };

// Obtener todas las criptos
export const getCryptos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cryptocurrencies');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener precios de una cripto
export const getCryptoPrices = async (req, res) => {
  const cryptoId = req.params.id;

  try {
    const [prices] = await db.query(
      'SELECT price_usd, percent_change_24h, volume_24h, date_time FROM prices WHERE cryptocurrency_id = ? ORDER BY date_time ASC',
      [cryptoId]
    );

    res.json(prices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo precios' });
  }
};

// Actualizar precios de todas las criptos (cada minuto)
export const updatePrices = async () => {
  try {
    const [cryptos] = await db.query('SELECT * FROM cryptocurrencies');

    for (const crypto of cryptos) {
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        { headers: CMC_HEADERS, params: { id: crypto.cmc_id } }
      );

      const data = response.data.data[crypto.cmc_id];

      await db.query(
        'INSERT INTO prices (cryptocurrency_id, price_usd, percent_change_24h, volume_24h, date_time) VALUES (?, ?, ?, ?, NOW())',
        [crypto.id, data.quote.USD.price, data.quote.USD.percent_change_24h, data.quote.USD.volume_24h]
      );
    }

    console.log('Precios actualizados.');
  } catch (err) {
    console.error('Error actualizando precios:', err.message);
  }
};

// Inicializar criptos si no existen
export const initializeCryptos = async () => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM cryptocurrencies');
    if (rows[0].count > 0) return;

    const res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: CMC_HEADERS,
      params: { start: 1, limit: 100, convert: 'USD' } // todas las primeras 100
    });

    const cryptos = res.data.data;

    for (let c of cryptos) {
      const [result] = await db.query(
        'INSERT INTO cryptocurrencies (name, symbol, cmc_id) VALUES (?, ?, ?)',
        [c.name, c.symbol, c.id]
      );

      const price = c.quote.USD;
      await db.query(
        'INSERT INTO prices (cryptocurrency_id, price_usd, percent_change_24h, volume_24h, date_time) VALUES (?, ?, ?, ?, NOW())',
        [result.insertId, price.price, price.percent_change_24h, price.volume_24h]
      );
    }

    console.log('Criptomonedas inicializadas automáticamente.');
  } catch (err) {
    console.error('Error inicializando criptos:', err.message);
  }
};
