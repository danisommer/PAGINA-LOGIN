const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
  )`);
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  if (!email || !senha) {
    return res.status(400).json({ error: 'É necessário fornecer um email e uma senha' });
  }

  db.run('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados' });
    }
    res.json({ message: 'Login bem-sucedido' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
