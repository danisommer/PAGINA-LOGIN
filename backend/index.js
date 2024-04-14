const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

// Rota para lidar com solicitações POST de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  // Salvar os dados no banco de dados
  const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
  connection.query(sql, [email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao salvar os dados' });
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.json({ message: 'Dados salvos com sucesso' });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
