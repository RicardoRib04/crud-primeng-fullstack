var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var {findAgendamentoById, createAgendamento, getAgendamentos, deleteAgendamento, updateAgendamento} = require('../models/agendamentoModel')

// BANCO DE DADOS
// const agendamentos = [
//   {nome: "henning", idade: 40, matricula: 123456}
// ]

/* GET agendamentos API. */
router.get('/',authenticateToken, function(req, res, next) {
  getAgendamentos((err, agendamentos)=>{
    if(err){
      console.error('getAgendamentos erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar agendamentos'})
    }

    return res.status(200).json({agendamentos: agendamentos})
  })
});

/* GET agendamentos pelo ID API. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  console.log("veio", id)
  findAgendamentoById(id, (err, agendamento)=>{
    if(err){
      console.error('findAgendamentoById erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar agendamento'})
    }

    if(!agendamento){
      return res.status(404).json({error: 'Agendamento não encontrado'})
    }

    return res.status(200).json({agendamento: agendamento})
  })
});

/* POST agendamentos API. */
router.post('/',authenticateToken, function(req, res, next) {
  // aceitar tanto { name } quanto { nameAgendamento } para compatibilidade
  const owner = req.body.owner || req.body.nameAgendamento
  const pet = req.body.pet
  const service = req.body.service
  const date = req.body.date
  const time = req.body.time
  const status = req.body.status
  

  console.log('veio', { owner, pet, service, date, time, status })

  createAgendamento(owner, pet, service, date, time, status,(err, newAgendamento)=>{
    if(err){
      console.error('createAgendamento erro:', err.message)
      return res.status(500).json({error: 'Erro ao salvar agendamento'})
    }

    return res.status(201).json({message: 'Usuário criado com sucesso', agendamento: newAgendamento})
  })
});

// DELETE agendamento API.
router.delete('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  deleteAgendamento(id, (err)=>{
    if(err){
      console.error('deleteAgendamento erro:', err.message)
      return res.status(500).json({error: 'Erro ao deletar agendamento'})
    }

    return res.status(200).json({message: 'Agendamento deletado com sucesso'})
  })
})

router.put('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  const { owner, pet, service, date, time, status} = req.body

  updateAgendamento(id, owner, pet, service, date, time, status,(err)=>{
    if(err){
      console.error('updateAgendamento erro:', err.message)
      return res.status(500).json({error: 'Erro ao atualizar agendamento'})
    }

    return res.status(200).json({message: 'Agendamento atualizado com sucesso'})
  })
})

module.exports = router;
