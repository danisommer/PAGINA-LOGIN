const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para fazer o parse do corpo da solicitação como JSON
app.use(express.json());

// Configuração do SQLite
const db = new sqlite3.Database('database.db');

// Criar a tabela 'usuarios' se ela não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
  )`);
});

// Rota para lidar com solicitações POST de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  // Verifique se o email e a senha estão presentes
  if (!email || !senha) {
    return res.status(400).json({ error: 'É necessário fornecer um email e uma senha' });
  }

  // Inserir os dados de email e senha no banco de dados
  db.run('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados' });
    }
    res.json({ message: 'Login bem-sucedido' });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
