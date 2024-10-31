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

const pool = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: MYSQL_DATABASE,
  port: DATABASE_PORT,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

module.exports = pool.promise();

