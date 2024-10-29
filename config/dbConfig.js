/*
   Configuración de la base de datos
*/

const mysql = require('mysql2');
const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  MYSQL_DATABASE,
  DATABASE_PORT
} = require('../config.js');

const connection = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: MYSQL_DATABASE,
  port: DATABASE_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

module.exports = connection;
