import axios from "axios";
import dotenv from "dotenv";
import { Crypto } from "../models/Crypto.js"; // 👈 recuerda el .js

dotenv.config();

const API_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// Función para traer datos de criptomonedas
export const fetchCryptoData = async () => {
  const response = await axios.get(API_URL, {
    headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY },
    params: { limit: 10, convert: "USD" },
  });

  return response.data.data.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    price: coin.quote.USD.price,
    volume: coin.quote.USD.volume_24h,
    percentChange: coin.quote.USD.percent_change_24h,
  }));
};

// Función para guardar datos en la base de datos
export const saveCryptoData = async (data) => {
  for (const coin of data) {
    await Crypto.create({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price,
      volume: coin.volume,
      percentChange: coin.percentChange,
    });
  }
};
// module.exports = { fetchCryptoData, saveCryptoData }; --- IGNORE ---