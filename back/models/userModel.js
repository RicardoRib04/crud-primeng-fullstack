const db = require('../db/database')
const bcrypt = require('bcryptjs')

function findUserByUsername(username, callback){
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row)=>{
        callback(err,row)
    })
}

async function createUser(username, password, callback){
    if(!password){
        return callback(new Error('Password é obrigatório'))
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err){
            if(err) return callback(err)
            callback(null, {id: this.lastID, username})
        })
    }catch(err){
        callback(err)
    }
}

module.exports = {findUserByUsername, createUser}