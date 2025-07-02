// Controlador para lidar com operações relacionadas a consulta de status
import { model } from '../database/model/resource-model.js';

// Função para listar Items
export const listarItems  = (req, res) => 
  model.find({}, 'id status')
    .then((resources) => res.type('.json').status(200).json(resources))
    .catch(() => res.type('.json').status(404).json({
      message: 'Nenhum recurso foi encontrado.',
      success: false
    }));

// Função para pesquisar 1 Item
export const getOneItem  = (req, res) => 
  model.findOne({ _id: req.params.id }, 'id status')
    .then((resource) => res.type('.json').status(200).json(resource))
    .catch(() => res.type('.json').status(404).json({
        message: 'Recurso não encontrado.',
        success: false,
        resources: req.params.id,
    }));

// Função para atualizar um item existente
export const updateItem = (req, res) => 
  model.findOneAndUpdate({ _id: req.params.id },
            {status: req.params.status,
            lastModifiedBy: req.body.userid,
            lastModifiedAt: new Date()})
    .then((recurso) =>
    res.type('.json').status(200).json({
      message: 'Status atualizado com sucesso!',
      success: true,
      resources: recurso,
    }))
    .catch(() =>  
    res.type('.json').status(404).json({
      message: 'Recurso não encontrado.',
      success: false,
      resources: req.params.id,
    }));
      