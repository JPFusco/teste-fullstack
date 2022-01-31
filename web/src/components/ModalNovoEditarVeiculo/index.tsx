import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import IFormulario from '../../interfaces/formulario';
import './style.css';

export default function ModalNovoEditarVeiculo() {
  const {
    veiculos,
    veiculoDetalhado,
    tipoModal,
    setModalAberto,
    formulario,
    setFormulario,
    authToken,
    updateVeiculos
  } = useGlobalContext();

  useEffect((): void => {
    if (tipoModal === "Novo") {
      setFormulario({
        veiculo: "",
        marca: "",
        ano: "",
        descricao: "",
        vendido: false
      });
    } else if (tipoModal === "Editar") {
      setFormulario({
        veiculo: veiculoDetalhado.veiculo,
        marca: veiculoDetalhado.marca,
        ano: `${veiculoDetalhado.ano}`,
        descricao: veiculoDetalhado.descricao,
        vendido: veiculoDetalhado.vendido
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoModal]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  }

  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormulario({
      ...formulario,
      vendido: e.target.checked
    });
  }

  const handleFecharModal = (): void => {
    if (veiculos.length > 0) {
      setFormulario({
        veiculo: veiculoDetalhado.veiculo,
        marca: veiculoDetalhado.marca,
        ano: `${veiculoDetalhado.ano}`,
        descricao: veiculoDetalhado.descricao,
        vendido: veiculoDetalhado.vendido
      });
    }

    setModalAberto(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formulario.veiculo || !formulario.marca || !formulario.ano || !formulario.descricao) {
      return; //TODO - Adicionar toastify
    }

    try {
      tipoModal === "Novo" ? await cadastrarVeiculo() : await atualizarVeiculo();
      updateVeiculos();
    } catch (error: any) {
      console.log(error.message);
    }

    handleFecharModal();
  }

  const cadastrarVeiculo = async (): Promise<void> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/veiculos`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(formulario)
    });

    const veiculoCadastrado = await response.json();

    if (response.status >= 400) {
      throw veiculoCadastrado;
    }
  }

  const atualizarVeiculo = async (): Promise<void> => {
    let utilizarPut = true;
    const camposDiferentes = algumCampoDiferente();

    if (Object.keys(camposDiferentes)) {
      utilizarPut = false;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/veiculos/${veiculoDetalhado.id}`, {
      method: utilizarPut ? "PUT" : "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(utilizarPut ? formulario : camposDiferentes)
    });

    if (response.status >= 400) {
      const error = await response.json();
      throw error;
    }
  }

  const algumCampoDiferente = (): Partial<IFormulario> => {
    const camposDiferentes: Partial<IFormulario> = {};

    if (formulario.veiculo !== veiculoDetalhado.veiculo) {
      camposDiferentes.veiculo = formulario.veiculo;
    }

    if (formulario.marca !== veiculoDetalhado.marca) {
      camposDiferentes.marca = formulario.marca;
    }

    if (formulario.ano !== veiculoDetalhado.ano) {
      camposDiferentes.ano = formulario.ano;
    }

    if (formulario.descricao !== veiculoDetalhado.descricao) {
      camposDiferentes.descricao = formulario.descricao;
    }

    if (formulario.vendido !== veiculoDetalhado.vendido) {
      camposDiferentes.vendido = formulario.vendido;
    }

    return camposDiferentes;
  }

  return (
    <div className="backdrop">
      <div className="modal-container">
        <h1>
          {tipoModal} Veículo
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            name="veiculo"
            label="Veículo"
            variant="standard"
            sx={{ width: "45%", marginRight: "60px", fontSize: "1.4rem" }}
            value={formulario.veiculo}
            onChange={handleChangeInput}
          />
          <TextField
            id="standard-basic"
            name="marca"
            label="Marca"
            variant="standard"
            sx={{ width: "45%", marginBottom: "50px" }}
            value={formulario.marca}
            onChange={handleChangeInput}
          />
          <TextField
            id="standard-basic"
            name="ano"
            label="Ano"
            variant="standard"
            sx={{ width: "45%", marginRight: "60px" }}
            value={formulario.ano}
            onChange={handleChangeInput}
          />
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={formulario.vendido}
                onChange={handleChangeSwitch}
              />}
            label="Vendido"
          />
          <TextField
            id="standard-basic"
            name="descricao"
            label="Descrição"
            variant="standard"
            multiline
            fullWidth
            rows="8"
            sx={{ marginTop: "50px" }}
            value={formulario.descricao}
            onChange={handleChangeInput}
          />
          <div className="form-footer">
            <button type='submit'>
              {tipoModal === "Novo" ? "ADD" : "ATUALIZAR"}
            </button>
            <button type='button' onClick={handleFecharModal}>
              FECHAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};