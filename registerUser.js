/*
   Script para agregar un usuario a la db-mysql
*/

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mayelon7',
  database: 'itaih_datospersonales'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    process.exit(1);
  }
  console.log('Conexión a la base de datos exitosa.');

  const username = 'elizabeth';
  const password = 'M-nribot123';
  const name = 'Comisonado Elizabeth Monribot Domínguez';
  const adress = '';
  const email = '';

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO usuarios (username, password, name) VALUES (?, ?, ?)';
  connection.query(query, [username, hashedPassword, name], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      process.exit(1);
    }

    console.log('Usuario registrado correctamente.');
    connection.end();
  });
});
