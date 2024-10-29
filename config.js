

const PORT = process.env.PORT || 3000;

const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root'
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'Mayelon7'
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'itaih_datospersonales'
const DATABASE_PORT = process.env.DATABASE_PORT || 3306;



module.exports = {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  MYSQL_DATABASE,
  DATABASE_PORT,
  PORT
};

