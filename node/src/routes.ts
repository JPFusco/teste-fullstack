import { Router } from 'express';
import veiculos from './controllers/veiculos';

const routes = Router();

routes.get('/veiculos', veiculos.obterVeiculos);
routes.get('/veiculos/:id', veiculos.obterVeiculo);
routes.post('/veiculos', veiculos.cadastrarVeiculo);
routes.put('/veiculos/:id', veiculos.atualizarVeiculoCompleto);
routes.patch('/veiculos/:id', veiculos.atualizarVeiculoParcial);
routes.delete('/veiculos/:id', veiculos.excluirVeiculo);

export default routes;
