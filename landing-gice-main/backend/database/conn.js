const mysql = require('mysql2/promise');


const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // A senha do seu banco
  database: 'gice',
  waitForConnections: true, // Permitir múltiplas conexões
  connectionLimit: 10, // Limitar número de conexões simultâneas
  queueLimit: 0 // Não limita o número de requisições na fila
});

module.exports = connection;
