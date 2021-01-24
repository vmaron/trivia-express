const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();

  return;
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

pool.poolQuery = async (sql, paramsArray) => {
  try {
    return await pool.query(sql, paramsArray);
  } catch (error) {
    console.log(`${error.message}`);
  }
  return undefined;
};


module.exports = pool;

