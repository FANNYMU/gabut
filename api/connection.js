const mysql = require('mysql2/promise');

async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat',
    port: 3308,
  });

  console.log('Connected to the database!');
  return connection;
}

module.exports = createConnection;
