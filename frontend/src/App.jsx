import React from 'react';
import CryptoList from './components/CryptoList.jsx';
import './index.css';

function App() {
  return (
    <div className="container">
      <h1>CryptoInvestment - Precios en Tiempo Real</h1>
      <CryptoList />
    </div>
  );
}

export default App;
