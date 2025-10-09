const CryptoCard = ({ crypto }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    background: '#f5f5f5',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
  }}>
    <h2>{crypto.name} ({crypto.symbol})</h2>
    <p>Precio USD: ${crypto.price}</p>
    <p>Cambio 24h: {crypto.percent_change_24h}%</p>
    <p>Volumen 24h: ${crypto.volume_24h}</p>
  </div>
);

export default CryptoCard;
