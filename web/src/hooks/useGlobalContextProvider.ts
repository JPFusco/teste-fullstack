import { useState } from 'react';
import IVeiculo from '../interfaces/veiculo';
import IFormulario from '../interfaces/formulario';

export default function useGlobalContextProvider() {
  const [veiculos, setVeiculos] = useState<Array<IVeiculo>>([]);
  const [veiculoDetalhado, setVeiculoDetalhado] = useState<IVeiculo>({} as IVeiculo);
  const [modalAberto, setModalAberto] = useState<Boolean>(false);
  const [tipoModal, setTipoModal] = useState<String>("");
  const [formulario, setFormulario] = useState<IFormulario>({
    veiculo: "",
    marca: "",
    ano: "",
    descricao: "",
    vendido: false
  });

  return {
    veiculos,
    setVeiculos,
    veiculoDetalhado,
    setVeiculoDetalhado,
    modalAberto,
    setModalAberto,
    tipoModal,
    setTipoModal,
    formulario,
    setFormulario
  }
}