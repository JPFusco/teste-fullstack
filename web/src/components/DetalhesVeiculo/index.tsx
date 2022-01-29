import { useEffect, useState } from 'react';
import IconeEditar from '../../assets/icone-editar.svg';
import VendidoFalse from '../../assets/vendido-false.svg';
import VendidoTrue from '../../assets/vendido-true.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import IVeiculo from '../../interfaces/veiculo';
import './style.css';

export default function DetalhesVeiculo({ veiculo }: { veiculo: IVeiculo }) {
  const { setTipoModal, setModalAberto, formulario, setFormulario, veiculoDetalhado } = useGlobalContext();

  const handleClick = (): void => {
    setTipoModal("Editar");
    setModalAberto(true);
  }

  useEffect(() => {
    setFormulario({
      veiculo: veiculoDetalhado.veiculo,
      marca: veiculoDetalhado.marca,
      ano: `${veiculoDetalhado.ano}`,
      descricao: veiculoDetalhado.descricao,
      vendido: veiculoDetalhado.vendido
    });
  }, [veiculoDetalhado]);

  return (
    <div className="detalhes-container">
      <h1 className='nome'>
        {formulario.veiculo}
      </h1>
      <div className="outros-detalhes">
        <div className="outro-detalhe-container">
          <h2>
            Marca
          </h2>
          <h3>
            {formulario.marca}
          </h3>
        </div>
        <div className="outro-detalhe-container">
          <h2>
            Ano
          </h2>
          <h3>
            {formulario.ano}
          </h3>
        </div>
      </div>
      <p>
        {formulario.descricao}
      </p>
      <div className="detalhes-footer">
        <button onClick={handleClick}>
          <img src={IconeEditar} alt="Editar veículo" />
          <span>EDITAR</span>
        </button>
        <img
          src={formulario.vendido ? VendidoTrue : VendidoFalse}
          alt={formulario.vendido ? "Veículo vendido" : "Veículo não foi vendido"}
        />
      </div>
    </div>
  );
}