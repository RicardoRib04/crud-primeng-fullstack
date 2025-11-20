const db = require('../db/database')

// Pegar agendamento pelo ID
function findAgendamentoById(id, callback){
    db.get('SELECT * FROM agendamentos WHERE id = ?', [id], (err, row)=>{
        callback(err,row)
    })
}

// Pegar todos os agendamentos
function getAgendamentos(callback){
    db.all('SELECT * FROM agendamentos', [], (err, rows)=>{
        callback(err, rows)
    })
}

// Criar um novo agendamento
function createAgendamento(owner, pet, service, date, time, status,callback){
    console.log('salvando no banco', owner)
    db.run(
        'INSERT INTO agendamentos (owner, pet, service, date, time, status) VALUES (?, ?, ?, ?)',[owner, pet, service, date, time, status], (err)=>{
            if(err){
                console.error('Erro ao inserir agendamento:', err.message)
                return callback(err)
            }

            const newAgendamento = { owner }
            callback(null, newAgendamento)
        }
    )
}

function deleteAgendamento(id, callback){
    db.run(
        'DELETE FROM agendamentos WHERE id = ?',[id], (err)=>{
            if(err){
                console.error('Erro ao deletar agendamento:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

function updateAgendamento(id, owner, pet, service, date, time, status,callback){
    db.run(
        'UPDATE agendamentos SET owner = ?, pet = ?, service = ?, date = ?, time = ?, status =  WHERE id = ?',
        [owner, pet, service, date, time, status,id],
        (err)=>{
            if(err){
                console.error('Erro ao atualizar agendamento:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = {findAgendamentoById, createAgendamento, getAgendamentos, deleteAgendamento, updateAgendamento}