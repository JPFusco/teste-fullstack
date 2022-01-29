import { Request, Response } from 'express';
import knexInstance from '../connection';
import IVeiculo from '../interfaces/db_interfaces';
import schemaCadastrarVeiculo from '../schema/veiculos/schemaCadastrarVeiculo';
import schemaAtualizarVeiculo from '../schema/veiculos/schemaAtualizarVeiculo';

interface IErr {
  ok: boolean,
  message: string
}

const encontrarVeiculoDB = async (id: string) => {
  const veiculo = await knexInstance<IVeiculo>('veiculos').where('id', id).select('*').first();
  const err: Partial<IErr> = { ok: true };

  if (!veiculo) {
    err.ok = false;
    err.message = `Não foi possível encontrar o veículo de id ${id}`;
  }

  return { veiculo, err };
};

const obterVeiculos = async (req: Request, res: Response) => {
  try {
    const veiculos = await knexInstance<IVeiculo>('veiculos').select('*');

    if (!veiculos) {
      return res.status(400).json({ message: 'Não foi possível encontrar um veículo' });
    }

    return res.status(200).json(veiculos);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const obterVeiculo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { veiculo, err } = await encontrarVeiculoDB(id);

    if (!err.ok) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(200).json(veiculo);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const cadastrarVeiculo = async (req: Request, res: Response) => {
  const {
    veiculo, marca, ano, descricao, vendido,
  } = req.body;

  try {
    await schemaCadastrarVeiculo.validate(req.body);

    const veiculoCadastrado = await knexInstance<IVeiculo>('veiculos').insert({
      veiculo,
      marca,
      ano,
      descricao,
      vendido,
    }).returning('*');

    if (!veiculoCadastrado) {
      return res.status(400).json({ message: 'Não foi possível cadastrar o veículo' });
    }

    return res.status(201).json();
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const atualizarVeiculoCompleto = async (req: Request, res: Response) => {
  const {
    veiculo, marca, ano, descricao, vendido,
  } = req.body;
  const { id } = req.params;

  try {
    await schemaCadastrarVeiculo.validate(req.body);

    const { err } = await encontrarVeiculoDB(id);

    if (!err.ok) {
      return res.status(400).json({ message: err.message });
    }

    const veiculoAtualizado = await knexInstance<IVeiculo>('veiculos').where('id', id).update({
      veiculo,
      marca,
      ano,
      descricao,
      vendido,
      updated: new Date(),
    }).returning('*');

    if (!veiculoAtualizado) {
      return res.status(400).json({ message: `Não foi possível atualizar o veículo de id ${id}` });
    }

    return res.status(200).json('Veículo atualizado com sucesso');
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const atualizarVeiculoParcial = async (req: Request, res: Response) => {
  const {
    veiculo, marca, ano, descricao, vendido,
  } = req.body;
  const { id } = req.params;

  try {
    await schemaAtualizarVeiculo.validate(req.body);

    const { err } = await encontrarVeiculoDB(id);

    if (!err.ok) {
      return res.status(400).json({ message: err.message });
    }

    const body: Partial<IVeiculo> = {};

    if (veiculo) {
      body.veiculo = veiculo;
    }

    if (marca) {
      body.marca = marca;
    }

    if (ano) {
      body.ano = ano;
    }

    if (descricao) {
      body.descricao = descricao;
    }

    if (vendido !== undefined) {
      body.vendido = vendido;
    }

    const veiculoAtualizado = await knexInstance<IVeiculo>('veiculos')
      .where('id', id)
      .update({ ...body, updated: new Date() })
      .returning('*');

    if (!veiculoAtualizado) {
      return res.status(400).json({ message: `Não foi possível atualizar o veículo de id ${id}` });
    }

    return res.status(200).json('Veículo atualizado com sucesso');
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const excluirVeiculo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { err } = await encontrarVeiculoDB(id);

    if (!err.ok) {
      return res.status(400).json({ message: err.message });
    }

    const veiculoExcluido = await knexInstance<IVeiculo>('veiculos').where('id', id).del().returning('*');

    if (!veiculoExcluido) {
      return res.status(400).json({ message: 'Não foi possível excluir o veículo' });
    }

    return res.status(200).json('Veículo excluído com sucesso');
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

export default {
  obterVeiculos,
  obterVeiculo,
  cadastrarVeiculo,
  atualizarVeiculoCompleto,
  atualizarVeiculoParcial,
  excluirVeiculo,
};
