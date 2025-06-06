const express = require('express');
const cors = require('cors');
const db = require('./database/conn');  

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  const query = 'INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email já está cadastrado.' });
      }
      return res.status(500).json({ message: 'Erro ao cadastrar o usuário.' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar usuário.' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
    const user = results[0];
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
