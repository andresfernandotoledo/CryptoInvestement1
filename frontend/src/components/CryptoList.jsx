import React, { useEffect, useState } from 'react';
import CryptoSelector from './CryptoSelector.jsx';
import CryptoChart from './CryptoChart.jsx';
import { getCryptos } from '../services/cryptoService.js';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getCryptos();
      setCryptos(data);
    };
    fetchCryptos();
  }, []);

  return (
    <div>
      <CryptoSelector
        cryptos={cryptos}
        selectedCrypto={selectedCrypto}
        onChange={setSelectedCrypto}
      />
      {selectedCrypto && (
        <div className="line-chart">
          <CryptoChart cryptoId={selectedCrypto} />
        </div>
      )}
    </div>
  );
};

export default CryptoList;
