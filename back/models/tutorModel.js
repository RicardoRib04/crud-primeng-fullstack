const db = require('../db/database')

// Pegar tutor pelo ID
function findTutorById(id, callback){
    db.get('SELECT * FROM tutores WHERE id = ?', [id], (err, row)=>{
        callback(err,row)
    })
}

// Pegar todos os tutores
function getTutores(callback){
    db.all('SELECT * FROM tutores', [], (err, rows)=>{
        callback(err, rows)
    })
}

// Criar um novo tutor
function createTutor(name, contact, address, associatedPets, callback){
    console.log('salvando no banco', name)
    db.run(
        'INSERT INTO tutores (name, contact, address, associatedPets ) VALUES (?, ?, ?, ?)',[name, contact, address, associatedPets ], (err)=>{
            if(err){
                console.error('Erro ao inserir tutor:', err.message)
                return callback(err)
            }

            const newTutor = { name }
            callback(null, newTutor)
        }
    )
}

function deleteTutor(id, callback){
    db.run(
        'DELETE FROM tutores WHERE id = ?',[id], (err)=>{
            if(err){
                console.error('Erro ao deletar tutor:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

function updateTutor(id, name, contact , address, associatedPets,callback){
    db.run(
        'UPDATE tutores SET name = ?, contact = ?, address = ?, associatedPets = ? WHERE id = ?',
        [id, name, contact, address, associatedPets],
        (err)=>{
            if(err){
                console.error('Erro ao atualizar tutor:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = {findTutorById, createTutor, getTutores, deleteTutor, updateTutor}