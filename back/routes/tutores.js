var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var {findTutorById, createTutor, getTutores, deleteTutor, updateTutor} = require('../models/tutorModel')

// BANCO DE DADOS
// const tutores = [
//   {nome: "henning", idade: 40, matricula: 123456}
// ]

/* GET tutores API. */
router.get('/',authenticateToken, function(req, res, next) {
  getTutores((err, tutores)=>{
    if(err){
      console.error('getTutores erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar tutores'})
    }

    return res.status(200).json({tutores: tutores})
  })
});

/* GET tutores pelo ID API. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  console.log("veio", id)
  findTutorById(id, (err, tutor)=>{
    if(err){
      console.error('findTutorById erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar tutor'})
    }

    if(!tutor){
      return res.status(404).json({error: 'Tutor não encontrado'})
    }

    return res.status(200).json({tutor: tutor})
  })
});

/* POST tutores API. */
router.post('/',authenticateToken, function(req, res, next) {
  // aceitar tanto { name } quanto { nameTutor } para compatibilidade
  const name = req.body.name || req.body.nameTutor
  const contact = req.body.contact
  const address = req.body.address
  const associatedPets = req.body.associatedPets

  console.log('veio', { name, contact, address, associatedPets })


  createTutor(name, contact, address, associatedPets, (err, newTutor)=>{
    if(err){
      console.error('createTutor erro:', err.message)
      return res.status(500).json({error: 'Erro ao salvar tutor'})
    }

    return res.status(201).json({message: 'Usuário criado com sucesso', tutor: newTutor})
  })
});

// DELETE tutor API.
router.delete('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  deleteTutor(id, (err)=>{
    if(err){
      console.error('deleteTutor erro:', err.message)
      return res.status(500).json({error: 'Erro ao deletar tutor'})
    }

    return res.status(200).json({message: 'Tutor deletado com sucesso'})
  })
})

router.put('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  const { name, contact, address, associatedPets } = req.body

  updateTutor(id, name, contact, address, associatedPets, (err)=>{
    if(err){
      console.error('updateTutor erro:', err.message)
      return res.status(500).json({error: 'Erro ao atualizar tutor'})
    }

    return res.status(200).json({message: 'Tutor atualizado com sucesso'})
  })
})

module.exports = router;
