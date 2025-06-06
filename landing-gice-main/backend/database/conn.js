const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: '',       
  database: 'gice' 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conectado ao MySQL com sucesso!');
  }
});

module.exports = connection;