'use strict';
const { Crypto } = require('../../backend/src/models/Crypto');

module.exports = {
  up: async () => {
    await Crypto.bulkCreate([
      { name: 'Bitcoin', symbol: 'BTC', price: 30000, volume: 1000000, percentChange: 2.5 },
      { name: 'Ethereum', symbol: 'ETH', price: 2000, volume: 500000, percentChange: -1.2 }
    ]);
  },
  down: async () => {
    await Crypto.destroy({ where: {} });
  }
};
