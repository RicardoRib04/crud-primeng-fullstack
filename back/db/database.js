const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco', err.message)
    } else {
        console.log('Banco conectado')
    }
})

console.log('Tabela users criada')
db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
`)

console.log('Tabela students criada')
db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            gender TEXT,
            age TEXT,
            code TEXT
        )
`)

console.log('Tabela pets criada')
db.run(`
        CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            gender TEXT,
            color TEXT,
            breed TEXT
        )
`)
console.log('Tabela tutores criada')
db.run(`
        CREATE TABLE IF NOT EXISTS tutores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            contact TEXT,
            address TEXT,
            associatedPets TEXT
        )
`)
console.log('Tabela produtos criada')
db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            petFood TEXT,
            toys TEXT,
            medications TEXT
        )
`)
console.log('Tabela servicos criada')
db.run(`
        CREATE TABLE IF NOT EXISTS servicos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            services TEXT,
            bathing TEXT,
            grooming TEXT,
            consultation TEXT,
            vaccination TEXT
        )
`)

console.log('Tabela agendamentos criada')
db.run(`
        CREATE TABLE IF NOT EXISTS agendamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner TEXT,
            pet TEXT,
            service TEXT,
            date TEXT,
            time TEXT,
            status TEXT
        )
`)

module.exports = db