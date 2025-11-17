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



console.log('Tabela tutores criada')

db.run(`

        CREATE TABLE IF NOT EXISTS tutores (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nome TEXT,

            contato TEXT,

            endereco TEXT

        )

`)

console.log('Tabela pets criada')
db.run(`
    CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        especie TEXT,
        raca TEXT,
        idade INTEGER,
        tutor_id INTEGER,
        FOREIGN KEY (tutor_id) REFERENCES tutores(id)
    )
`)

console.log('Tabela servicos criada')
db.run(`
    CREATE TABLE IF NOT EXISTS servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        descricao TEXT,
        preco REAL
    )
`)

console.log('Tabela produtos criada')
db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        descricao TEXT,
        preco REAL,
        estoque INTEGER
    )
`)

console.log('Tabela agendamentos criada')
db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tutor_id INTEGER,
        pet_id INTEGER,
        servico_id INTEGER,
        data_hora TEXT,
        status TEXT,
        FOREIGN KEY (tutor_id) REFERENCES tutores(id),
        FOREIGN KEY (pet_id) REFERENCES pets(id),
        FOREIGN KEY (servico_id) REFERENCES servicos(id)
    )
`)



module.exports = db