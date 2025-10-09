CREATE DATABASE cryptoinvestment;

USE cryptoinvestment;

CREATE TABLE cryptocurrencies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  cmc_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cryptocurrency_id INT NOT NULL,
  price_usd DECIMAL(20,8) NOT NULL,
  percent_change_24h DECIMAL(10,2) NOT NULL,
  volume_24h DECIMAL(20,2) NOT NULL,
  date_time DATETIME NOT NULL,
  FOREIGN KEY (cryptocurrency_id) REFERENCES cryptocurrencies(id)
);
