const db = require('../db/database')

// Pegar servico pelo ID
function findServicoById(id, callback){
    db.get('SELECT * FROM servicos WHERE id = ?', [id], (err, row)=>{
        callback(err,row)
    })
}

// Pegar todos os servicos
function getServicos(callback){
    db.all('SELECT * FROM servicos', [], (err, rows)=>{
        callback(err, rows)
    })
}

// Criar um novo servico
function createServico(services,bathing, grooming, consultation, vaccination, callback){
    console.log('salvando no banco', services) 
    db.run(
        'INSERT INTO servicos (services, bathing, grooming, consultation, vaccination) VALUES (?, ?, ?, ?, ?)',[services,bathing, grooming, consultation, vaccination], (err)=>{
            if(err){
                console.error('Erro ao inserir servico:', err.message)
                return callback(err)
            }

            const newServico = { services }
            callback(null, newServico)
        }
    )
}

function deleteServico(id, callback){
    db.run(
        'DELETE FROM servicos WHERE id = ?',[id], (err)=>{
            if(err){
                console.error('Erro ao deletar servico:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

function updateServico(services,bathing, grooming, consultation, vaccination, callback){
    db.run(
        'UPDATE servicos SET services = ?, bathing = ?, grooming = ?, consultation = ?, vaccination = ?WHERE id = ?',
        [services,bathing, grooming, consultation, vaccination, id],
        (err)=>{
            if(err){
                console.error('Erro ao atualizar servico:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = {findServicoById, createServico, getServicos, deleteServico, updateServico}