const db = require('../db/database')

// Pegar produto pelo ID
function findProdutoById(id, callback){
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row)=>{
        callback(err,row)
    })
}

// Pegar todos os produtos
function getProdutos(callback){
    db.all('SELECT * FROM produtos', [], (err, rows)=>{
        callback(err, rows)
    })
}

// Criar um novo produto
function createProduto(petFood, toys, medications, callback){
    console.log('salvando no banco', petFood)
    db.run(
        'INSERT INTO produtos (petFood, toys, medications) VALUES (?, ?, ?, ?)',[petFood, toys, medications ], (err)=>{
            if(err){
                console.error('Erro ao inserir produto:', err.message)
                return callback(err)
            }

            const newProduto = { petFood }
            callback(null, newProduto)
        }
    )
}

function deleteProduto(id, callback){
    db.run(
        'DELETE FROM produtos WHERE id = ?',[id], (err)=>{
            if(err){
                console.error('Erro ao deletar produto:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

function updateProduto(petFood, toys, medications, callback){
    db.run(
        'UPDATE produtos SET petFood = ?, toys = ?, medications = ?, WHERE id = ?',
        [petFood, toys, medications, id],
        (err)=>{
            if(err){
                console.error('Erro ao atualizar produto:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = {findProdutoById, createProduto, getProdutos, deleteProduto, updateProduto}