const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./database/conn'); // Conexão com o banco de dados

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Para lidar com requisições JSON

// Rota de cadastro
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    // Gerar o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir os dados no banco de dados
    const query = 'INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [name, email, hashedPassword]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar o usuário.' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário pelo email
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const user = results[0];

    // Comparar a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao tentar fazer login.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
