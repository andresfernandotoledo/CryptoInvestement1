import React from 'react';

const CryptoSelector = ({ cryptos, selectedCrypto, onChange }) => {
  return (
    <select value={selectedCrypto} onChange={(e) => onChange(e.target.value)}>
      <option value="">Seleccione una criptomoneda</option>
      {cryptos.map(c => (
        <option key={c.id} value={c.id}>
          {c.name} ({c.symbol})
        </option>
      ))}
    </select>
  );
};

export default CryptoSelector;
