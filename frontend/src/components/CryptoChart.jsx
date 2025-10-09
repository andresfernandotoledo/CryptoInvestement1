import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getCryptoPrices } from '../services/cryptoService.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoChart = ({ cryptoId }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!cryptoId) return;

    const fetchPrices = async () => {
      const data = await getCryptoPrices(cryptoId);

      setChartData({
        labels: data.map(p => new Date(p.date_time).toLocaleTimeString()),
        datasets: [
          {
            label: 'Precio USD',
            data: data.map(p => p.price_usd),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, 60000); // refresca cada minuto
    return () => clearInterval(interval);
  }, [cryptoId]);

  return <Line data={chartData} />;
};

export default CryptoChart;
