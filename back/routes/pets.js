var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var {findPetById, createPet, getPets, deletePet, updatePet} = require('../models/petModel')

/* GET pets API. */
router.get('/', authenticateToken, function(req, res, next) {
  getPets((err, pets)=>{
    if(err){
      console.error('getPets erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar pets'})
    }
    return res.status(200).json({pets: pets})
  })
});

/* GET pets pelo ID API. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  findPetById(id, (err, pet)=>{
    if(err){
      console.error('findPetById erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar pet'})
    }
    if(!pet){
      return res.status(404).json({error: 'Pet não encontrado'})
    }
    return res.status(200).json({pet: pet})
  })
});

/* POST pets API. */
router.post('/', authenticateToken, function(req, res, next) {
  // Precisamos pegar TODOS os campos novos aqui
  const { name, species, breed, age, gender, color, tutorId } = req.body

  console.log('Criando pet:', { name, species, breed, age })

  // A ordem aqui TEM que ser a mesma do petModel.js
  createPet(name, species, breed, age, gender, color, tutorId, (err, newPet)=>{
    if(err){
      console.error('createPet erro:', err.message)
      return res.status(500).json({error: 'Erro ao salvar pet'})
    }
    return res.status(201).json({message: 'Pet criado com sucesso', pet: newPet})
  })
});

// DELETE pet API.
router.delete('/:id', authenticateToken, function(req, res){
  const id = req.params.id
  deletePet(id, (err)=>{
    if(err){
      console.error('deletePet erro:', err.message)
      return res.status(500).json({error: 'Erro ao deletar pet'})
    }
    return res.status(200).json({message: 'Pet deletado com sucesso'})
  })
})

// PUT pet API
router.put('/:id', authenticateToken, function(req, res){
  const id = req.params.id
  // Pegando todos os campos para atualizar
  const { name, species, breed, age, gender, color, tutorId } = req.body

  updatePet(id, name, species, breed, age, gender, color, tutorId, (err)=>{
    if(err){
      console.error('updatePet erro:', err.message)
      return res.status(500).json({error: 'Erro ao atualizar pet'})
    }
    return res.status(200).json({message: 'Pet atualizado com sucesso'})
  })
})

module.exports = router;