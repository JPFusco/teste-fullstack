import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import IFormulario from '../../interfaces/formulario';
import './style.css';

export default function ModalNovoEditarVeiculo() {
  const {
    veiculoDetalhado,
    tipoModal,
    setModalAberto,
    formulario,
    setFormulario
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
    setFormulario({
      veiculo: veiculoDetalhado.veiculo,
      marca: veiculoDetalhado.marca,
      ano: `${veiculoDetalhado.ano}`,
      descricao: veiculoDetalhado.descricao,
      vendido: veiculoDetalhado.vendido
    });

    setModalAberto(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formulario.veiculo || !formulario.marca || !formulario.ano || !formulario.descricao) {
      return; //TODO - Adicionar toastify
    }

    try {
      tipoModal === "Novo" ? cadastrarVeiculo() : atualizarVeiculo();
    } catch (error: any) {
      console.log(error.message);
    }

    setModalAberto(false);
  }

  const cadastrarVeiculo = async (): Promise<void> => {
    await fetch("http://localhost:8000/veiculos", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formulario)
    });
  }

  const atualizarVeiculo = async (): Promise<void> => {
    let utilizarPut = true;
    const camposDiferentes = algumCampoDiferente();

    if (Object.keys(camposDiferentes)) {
      utilizarPut = false;
    }

    await fetch(`http://localhost:8000/veiculos/${veiculoDetalhado.id}`, {
      method: utilizarPut ? "PUT" : "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(utilizarPut ? formulario : camposDiferentes)
    });

  }

  const algumCampoDiferente = (): Partial<IFormulario> => {
    const camposDiferentes: Partial<IFormulario> = {};

    if (formulario.veiculo !== veiculoDetalhado.veiculo) {
      camposDiferentes.veiculo = formulario.veiculo;
    }

    if (formulario.marca !== veiculoDetalhado.marca) {
      camposDiferentes.marca = formulario.marca;
    }

    if (Number(formulario.ano) !== veiculoDetalhado.ano) {
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