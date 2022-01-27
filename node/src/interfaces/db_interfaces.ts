interface IVeiculo {
  id: number,
  veiculo: string,
  marca: string,
  ano: number,
  descricao: string,
  vendido: boolean,
  created: Date,
  updated?: Date
}

export default IVeiculo;
