# CryptoInvestment

Aplicación web (SPA) para monitoreo de criptomonedas en tiempo real con persistencia histórica.

## Stack
- **Frontend:** React + Vite + Chart.js
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Fuente de mercado:** CoinMarketCap API

## Arquitectura
- `frontend/`: interfaz SPA, selector de cripto, gráfico de historial, manejo de estados de carga/error.
- `backend/`: API REST, sincronización periódica con CMC, persistencia en MySQL.
- `database/`: scripts SQL de creación y carga inicial.
- `docs/`: análisis RF/RNF, endpoints CMC, modelo BD, ER, guía de video.

## Requisitos previos
- Node.js 18+
- npm 9+
- MySQL 8+
- API Key de CoinMarketCap (plan gratuito)

## Configuración rápida

### 1) Base de datos
Ejecutar:
```sql
SOURCE database/scripts/create_tables.sql;
SOURCE database/scripts/init_data.sql;
```

O usar el modelo sugerido en `docs/db-model.sql`.

### 2) Variables de entorno

**Backend (`backend/.env`)**
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=crypto_user
DB_PASSWORD=123456
DB_NAME=cryptoinvestment
CMC_API_KEY=tu_api_key
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:4000/api
```

### 3) Instalar dependencias
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4) Ejecutar proyecto
```bash
cd backend && npm run dev
cd ../frontend && npm run dev
```

## Endpoints principales
- `GET /api/health` -> estado de conectividad de DB.
- `GET /api/cryptos` -> catálogo de criptomonedas.
- `GET /api/cryptos/:id/prices` -> histórico de precios por cripto.

## Flujo funcional
1. Backend arranca y valida conexión a MySQL.
2. Si no existe catálogo, realiza seed inicial desde CMC.
3. Cada minuto guarda snapshots de precios/volumen/cambio.
4. Frontend consulta catálogo, permite selección y dibuja histórico sin recargar página.

## Pruebas recomendadas
- `GET /api/health` debe responder `database: connected`.
- `GET /api/cryptos` debe devolver arreglo con monedas.
- En frontend, seleccionar moneda debe actualizar el gráfico dinámicamente.
- Verificar responsive en 1366px, 768px y 390px.
