const db = require('../db/database')

// Pegar produto pelo ID
function findProdutoById(id, callback) {
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
        callback(err, row)
    })
}

// Pegar todos os produtos
function getProdutos(callback) {
    db.all('SELECT * FROM produtos', [], (err, rows) => {
        callback(err, rows)
    })
}

// Criar um novo produto
// Seguindo o pedido do professor: Nome, Descrição, Preço, Estoque
function createProduto(name, description, price, stock, callback) {
    console.log('salvando no banco', name)
    
    db.run(
        'INSERT INTO produtos (name, description, price, stock) VALUES (?, ?, ?, ?)', 
        [name, description, price, stock], 
        function(err) { // Use 'function' aqui para ter acesso ao 'this.lastID'
            if (err) {
                console.error('Erro ao inserir produto:', err.message)
                return callback(err)
            }

            // Retorna o objeto criado com o ID gerado
            const newProduto = { id: this.lastID, name, description, price, stock }
            callback(null, newProduto)
        }
    )
}

function deleteProduto(id, callback) {
    db.run(
        'DELETE FROM produtos WHERE id = ?', [id], (err) => {
            if (err) {
                console.error('Erro ao deletar produto:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

// Atualizar produto
// ATENÇÃO: Adicionei o ID no começo dos argumentos
function updateProduto(id, name, description, price, stock, callback) {
    db.run(
        'UPDATE produtos SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
        [name, description, price, stock, id],
        (err) => {
            if (err) {
                console.error('Erro ao atualizar produto:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = { findProdutoById, createProduto, getProdutos, deleteProduto, updateProduto }