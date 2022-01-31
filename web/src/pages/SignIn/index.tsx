import Logo from '../../assets/logo.svg';
import './style.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


export default function SignIn() {
  return (
    <div className="sign-up-container">
      <div className="sign-up-left">
        <img src={Logo} alt="Logo da Fullstack" />
      </div>
      <div className="sign-up-right">
        <h1>
          Sign In
        </h1>
        <form>
          <TextField
            id="standard-basic"
            name="email"
            label="E-mail"
            variant="standard"
            sx={{ marginBottom: '15px' }}
          // value={}
          // onChange={}
          />
          <TextField
            id="standard-basic"
            name="senha"
            label="Senha"
            variant="standard"
            sx={{ marginBottom: '35px' }}
          // value={}
          // onChange={}
          />
          <button>
            ENTRAR
          </button>
        </form>
        <h2>
          Não tem uma conta?
          {/*  <Link to='/sign-up'>Cadastre-se</Link> */}
        </h2>
      </div>
    </div>
  );
}