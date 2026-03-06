require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

//pool.query('SELECT NOW()')
// .then((res) => {
//   console.log("conectou, data do servidor: ", res.rows[0])
// })
// .catch((err) => {
//   console.error(err)
// })

  module.exports = pool;
