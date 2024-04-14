import React, { useState } from 'react';
import axios from 'axios'
import './LoginForm.css'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email: email,
        senha: password 
      });
      console.log(response.data);
      // Faça algo com a resposta, como redirecionar o usuário para uma nova página
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Lide com o erro de forma apropriada, como exibir uma mensagem de erro para o usuário
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form">
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
