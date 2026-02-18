# Documentación de la aplicación CryptoInvestment

## 1. Descripción general
CryptoInvestment es una aplicación web tipo SPA para monitorear criptomonedas y consultar su historial de precios en USD. El sistema se compone de un frontend en React y un backend en Node.js/Express con persistencia en MySQL.

## 2. Objetivo funcional
- Mostrar listado de criptomonedas disponibles.
- Permitir seleccionar una moneda desde un combo.
- Visualizar historial de precios en un gráfico de línea.
- Actualizar datos de mercado cada minuto mediante integración con CoinMarketCap.

## 3. Arquitectura
- **Frontend (`frontend/`)**: interfaz de usuario, selector, consumo de API y gráfico.
- **Backend (`backend/`)**: API REST, sincronización de precios y lógica de inicialización.
- **Base de datos (`database/`)**: scripts SQL para esquema y carga.
- **Documentación (`docs/`)**: este documento en Markdown y PDF.

## 4. Tecnologías
- **Frontend**: React 19, Vite, Chart.js, react-chartjs-2, Axios.
- **Backend**: Node.js (ES Modules), Express, CORS, Axios, MySQL2, Dotenv.
- **Base de datos**: MySQL 8+.
- **Proveedor de datos**: CoinMarketCap API.

## 5. Estructura principal del código

### Backend
- `backend/server.js`: levanta Express, monta rutas y configura tareas periódicas.
- `backend/routes/crypto.js`: endpoints REST bajo `/api`.
- `backend/controllers/cryptoController.js`:
  - `getCryptos`: lista monedas almacenadas.
  - `getCryptoPrices`: historial de una cripto por ID.
  - `updatePrices`: consulta CMC y guarda snapshot por cripto cada minuto.
- `backend/scripts/fillcryptos.js`: inicializa catálogo y precio inicial si la tabla está vacía.
- `backend/models/db.js`: pool MySQL (`mysql2/promise`).

### Frontend
- `frontend/src/App.jsx`: contenedor principal.
- `frontend/src/components/CryptoList.jsx`: obtiene catálogo y orquesta selector + gráfico.
- `frontend/src/components/CryptoSelector.jsx`: selector de criptomonedas.
- `frontend/src/components/CryptoChart.jsx`: gráfico de línea y refresco cada 60s.
- `frontend/src/services/cryptoService.js`: cliente Axios hacia backend.

## 6. Modelo de datos

### Tabla `cryptocurrencies`
- `id` (PK)
- `name`
- `symbol`
- `cmc_id`
- `created_at`
- `updated_at`

### Tabla `prices`
- `id` (PK)
- `cryptocurrency_id` (FK -> `cryptocurrencies.id`)
- `price_usd`
- `percent_change_24h`
- `volume_24h`
- `date_time`

## 7. API REST
Base URL sugerida: `http://localhost:4000/api`

- `GET /cryptos`
  - Respuesta: arreglo de criptomonedas.
- `GET /cryptos/:id/prices`
  - Parámetro: `id` interno de la tabla `cryptocurrencies`.
  - Respuesta: historial ordenado por fecha ascendente.

## 8. Configuración del entorno

### Requisitos
- Node.js 18+
- npm 9+
- MySQL 8+
- API Key de CoinMarketCap

### Variables de entorno backend (`backend/.env`)
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=crypto_user
DB_PASSWORD=123456
DB_NAME=cryptoinvestment
CMC_API_KEY=tu_api_key
```

### Variables de entorno frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:4000/api
```

## 9. Puesta en marcha

1. Crear esquema y tablas:
```sql
SOURCE database/scripts/create_tables.sql;
```
2. Instalar dependencias:
```bash
cd backend && npm install
cd ../frontend && npm install
```
3. Iniciar backend:
```bash
cd backend && npm run dev
```
4. Iniciar frontend (otra terminal):
```bash
cd frontend && npm run dev
```

## 10. Flujo operativo
1. El backend arranca y monta rutas `/api`.
2. Se ejecuta inicialización de catálogo (`initializeCryptos`) si no hay datos.
3. Cada 60 segundos se ejecuta `updatePrices` y se guarda snapshot.
4. El frontend consulta catálogo y, al seleccionar una moneda, solicita su histórico para renderizar el gráfico.

## 11. Validaciones recomendadas
- `GET /api/cryptos` retorna monedas.
- `GET /api/cryptos/:id/prices` retorna historial con fechas.
- Al cambiar de cripto en UI, el gráfico cambia.
- Confirmar actualización periódica de datos cada minuto.

## 12. Observaciones técnicas
- El frontend tiene un `BASE_URL` fijo en `frontend/src/services/cryptoService.js`.
- Existe un script `database/scripts/init_data.sql` con nombres de base/tablas distintos al esquema principal; se recomienda revisar antes de usarlo en entornos productivos.

## 13. Mejoras sugeridas
- Mover `BASE_URL` del frontend a variable `VITE_API_URL`.
- Añadir endpoint `GET /api/health` para chequeo de salud.
- Incorporar manejo de errores y estados de carga en frontend.
- Agregar tests automatizados (unitarios/integración).

