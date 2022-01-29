import './style.css';
import Logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <div className="header-container">
      <header>
        <div className="header-left">
          <img src={Logo} alt="Gota d'água escrito fullstack ao lado" />
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder='BUSCA por um veículo'
          />
        </div>
      </header>
    </div>
  );
}