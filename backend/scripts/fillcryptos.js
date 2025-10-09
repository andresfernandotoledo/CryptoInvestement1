import axios from 'axios';
import  pool  from '../models/db.js';

const CMC_API_KEY = process.env.CMC_API_KEY;
const CMC_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export const initializeCryptos = async () => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM cryptocurrencies');
    if (rows[0].count > 0) return; // ya hay datos, no hacer nada

    const res = await axios.get(CMC_URL, {
      headers: { 'X-CMC_PRO_API_KEY': CMC_API_KEY },
      params: { start: 1, limit: 10, convert: 'USD' },
    });

    const cryptos = res.data.data;

    for (let c of cryptos) {
      const [result] = await pool.query(
        'INSERT INTO cryptocurrencies (name, symbol, cmc_id) VALUES (?, ?, ?)',
        [c.name, c.symbol, c.id]
      );

      const price = c.quote.USD;
      await pool.query(
        'INSERT INTO prices (cryptocurrency_id, price_usd, percent_change_24h, volume_24h, date_time) VALUES (?, ?, ?, ?, NOW())',
        [result.insertId, price.price, price.percent_change_24h, price.volume_24h]
      );
    }

    console.log('Criptomonedas inicializadas automáticamente.');
  } catch (err) {
    console.error('Error inicializando criptos:', err.message);
  }
};
