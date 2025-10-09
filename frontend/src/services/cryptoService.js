import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api';

export const getCryptos = async () => {
  const res = await axios.get(`${BASE_URL}/cryptos`);
  return res.data;
};

export const getCryptoPrices = async (symbol) => {
  const res = await axios.get(`${BASE_URL}/cryptos/${symbol}/prices`);
  return res.data;
};
