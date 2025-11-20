const db = require('../db/database')

// Pegar serviço pelo ID
function findServicoById(id, callback) {
    db.get('SELECT * FROM servicos WHERE id = ?', [id], (err, row) => {
        callback(err, row)
    })
}

// Pegar todos os serviços
function getServicos(callback) {
    db.all('SELECT * FROM servicos', [], (err, rows) => {
        callback(err, rows)
    })
}

// Criar um novo serviço
// Requisito do Professor: Nome, Descrição, Preço
function createServico(name, description, price, callback) {
    console.log('salvando no banco', name)
    
    db.run(
        'INSERT INTO servicos (name, description, price) VALUES (?, ?, ?)', 
        [name, description, price], 
        function(err) {
            if (err) {
                console.error('Erro ao inserir servico:', err.message)
                return callback(err)
            }

            // Retorna o objeto com o ID criado
            const newServico = { id: this.lastID, name, description, price }
            callback(null, newServico)
        }
    )
}

function deleteServico(id, callback) {
    db.run(
        'DELETE FROM servicos WHERE id = ?', [id], (err) => {
            if (err) {
                console.error('Erro ao deletar servico:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

// Atualizar serviço
// CORREÇÃO: Adicionado 'id' como primeiro argumento
function updateServico(id, name, description, price, callback) {
    db.run(
        'UPDATE servicos SET name = ?, description = ?, price = ? WHERE id = ?',
        [name, description, price, id],
        (err) => {
            if (err) {
                console.error('Erro ao atualizar servico:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = { findServicoById, createServico, getServicos, deleteServico, updateServico }