import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './style.css';
import { useState } from 'react';
import useGlobalContexts from '../../hooks/useGlobalContext';

interface IFormularioLogin {
  email: string;
  senha: string;
}

export default function SignIn() {
  const [formularioLogin, setFormularioLogin] = useState<IFormularioLogin>({
    email: '',
    senha: ''
  });
  const { setAuthToken } = useGlobalContexts();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormularioLogin({
      ...formularioLogin,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formularioLogin.email || !formularioLogin.senha) {
        const error = { message: "Todos os campos são obrigatórios" }
        throw error;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formularioLogin)
      });
      const { token } = await response.json();

      if (response.status >= 400) {
        const error = await response.json();
        throw error;
      }

      setAuthToken(token);
      navigate('/home');
    } catch (error: any) {
      if (error.message) {
        return console.log(error.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-left">
        <img src={Logo} alt="Logo da Fullstack" />
      </div>
      <div className="sign-in-right">
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
            value={formularioLogin.email}
            onChange={handleChange}
          />
          <TextField
            id="senha"
            name="senha"
            label="Senha"
            variant="standard"
            type="password"
            sx={{ marginBottom: '35px' }}
            value={formularioLogin.senha}
            onChange={handleChange}
          />
          <button type='submit'>
            ENTRAR
          </button>
        </form>
        <h2>
          Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
        </h2>
      </div>
    </div>
  );
}