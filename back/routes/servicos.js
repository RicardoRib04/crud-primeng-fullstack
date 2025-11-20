var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var {findServicoById, createServico, getServicos, deleteServico, updateServico} = require('../models/servicoModel')

// BANCO DE DADOS
// const servicos = [
//   {nome: "henning", idade: 40, matricula: 123456}
// ]

/* GET servicos API. */
router.get('/',authenticateToken, function(req, res, next) {
  getServicos((err, servicos)=>{
    if(err){
      console.error('getServicos erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar servicos'})
    }

    return res.status(200).json({servicos: servicos})
  })
});

/* GET servicos pelo ID API. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  console.log("veio", id)
  findServicoById(id, (err, servico)=>{
    if(err){
      console.error('findServicoById erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar servico'})
    }

    if(!servico){
      return res.status(404).json({error: 'Servico não encontrado'})
    }

    return res.status(200).json({servico: servico})
  })
});

/* POST servicos API. */
router.post('/',authenticateToken, function(req, res, next) {
  // aceitar tanto { name } quanto { nameServico } para compatibilidade
  const name = req.body.name || req.body.nameServico
  const description = req.body.description
  const price = req.body.price

  console.log('veio', { name, description, price})

  createServico(name, description, price,(err, newServico)=>{
    if(err){
      console.error('createServico erro:', err.message)
      return res.status(500).json({error: 'Erro ao salvar servico'})
    }

    return res.status(201).json({message: 'Usuário criado com sucesso', servico: newServico})
  })
});

// DELETE servico API.
router.delete('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  deleteServico(id, (err)=>{
    if(err){
      console.error('deleteServico erro:', err.message)
      return res.status(500).json({error: 'Erro ao deletar servico'})
    }

    return res.status(200).json({message: 'Servico deletado com sucesso'})
  })
})

router.put('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  const { name, description, price} = req.body

  updateServico(id, name, description, price, (err)=>{
    if(err){
      console.error('updateServico erro:', err.message)
      return res.status(500).json({error: 'Erro ao atualizar servico'})
    }

    return res.status(200).json({message: 'Servico atualizado com sucesso'})
  })
})

module.exports = router;
