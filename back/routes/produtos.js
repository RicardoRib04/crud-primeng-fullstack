var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var {findProdutoById, createProduto, getProdutos, deleteProduto, updateProduto} = require('../models/produtoModel')

// BANCO DE DADOS
// const produtos = [
//   {nome: "henning", idade: 40, matricula: 123456}
// ]

/* GET produtos API. */
router.get('/',authenticateToken, function(req, res, next) {
  getProdutos((err, produtos)=>{
    if(err){
      console.error('getProdutos erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar produtos'})
    }

    return res.status(200).json({produtos: produtos})
  })
});

/* GET produtos pelo ID API. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  console.log("veio", id)
  findProdutoById(id, (err, produto)=>{
    if(err){
      console.error('findProdutoById erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar produto'})
    }

    if(!produto){
      return res.status(404).json({error: 'Produto não encontrado'})
    }

    return res.status(200).json({produto: produto})
  })
});

/* POST produtos API. */
router.post('/',authenticateToken, function(req, res, next) {
  // aceitar tanto { petFood } quanto { nameProduto } para compatibilidade

  const { name, description, price, stock } = req.body;

  console.log('veio', { name, description, price, stock })

  // Assumindo que createProduto espera esses três argumentos
  createProduto(name, description, price, stock, (err, newProduto)=>{
    if(err){
      console.error('createProduto erro:', err.message)
      return res.status(500).json({error: 'Erro ao salvar produto'})
    }

    return res.status(201).json({message: 'Usuário criado com sucesso', produto: newProduto})
  })
});

// DELETE produto API.
router.delete('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  deleteProduto(id, (err)=>{
    if(err){
      console.error('deleteProduto erro:', err.message)
      return res.status(500).json({error: 'Erro ao deletar produto'})
    }

    return res.status(200).json({message: 'Produto deletado com sucesso'})
  })
})

router.put('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  const { name, description, price, stock } = req.body

  updateProduto(id, name, description, price, stock,(err)=>{
    if(err){
      console.error('updateProduto erro:', err.message)
      return res.status(500).json({error: 'Erro ao atualizar produto'})
    }

    return res.status(200).json({message: 'Produto atualizado com sucesso'})
  })
})

module.exports = router;
