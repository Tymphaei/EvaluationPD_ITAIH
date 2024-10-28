/*
   Configuración de la base de datos
*/

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mayelon7',
  database: 'itaih_datospersonales'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

module.exports = connection;
