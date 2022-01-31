import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './style.css';

interface IFormularioCadastro {
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function SignUp() {
  const [formularioCadastro, setFormularioCadastro] = useState<IFormularioCadastro>({
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormularioCadastro({
      ...formularioCadastro,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formularioCadastro.email || !formularioCadastro.senha || !formularioCadastro.confirmarSenha) {
        return console.warn("Todos os campos são obrigatórios");
      }

      const senhasIguais = formularioCadastro.senha === formularioCadastro.confirmarSenha;

      if (!senhasIguais) {
        return console.warn("As senhas precisam ser iguais");
      }

      const { confirmarSenha, ...body } = formularioCadastro;
      const resposta = await fetch(`${process.env.REACT_APP_API_URL}/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (resposta.status >= 400) {
        const error = await resposta.json();
        throw error;
      }

      navigate('/');
    } catch (error: any) {
      console.log(error.message);
    }

  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-left">
        <img src={Logo} alt="Logo da Fullstack" />
      </div>
      <div className="sign-up-right">
        <h1>
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="E-mail"
            variant="standard"
            sx={{ marginBottom: '15px' }}
            value={formularioCadastro.email}
            onChange={handleChange}
          />
          <TextField
            id="senha"
            name="senha"
            label="Senha"
            variant="standard"
            type="password"
            sx={{ marginBottom: '15px' }}
            value={formularioCadastro.senha}
            onChange={handleChange}
          />
          <TextField
            id="confirmarSenha"
            name="confirmarSenha"
            label="Confirmar Senha"
            variant="standard"
            type="password"
            sx={{ marginBottom: '35px' }}
            value={formularioCadastro.confirmarSenha}
            onChange={handleChange}
          />
          <button type='submit'>
            CADASTRAR
          </button>
        </form>
        <h2>
          Possui uma conta? <Link to='/'>Entrar</Link>
        </h2>
      </div>
    </div>
  );
}