const db = require('../db/database');

// Get all pets
function getAll(callback) {
    db.all('SELECT * FROM pets', [], (err, rows) => {
        callback(err, rows);
    });
}

// Get pet by ID
function getById(id, callback) {
    db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
        callback(err, row);
    });
}

// Create a new pet
function create(pet, callback) {
    const { name, species, breed, age, tutorId } = pet;
    const sql = 'INSERT INTO pets (name, species, breed, age, tutorId) VALUES (?,?,?,?,?)';
    db.run(sql, [name, species, breed, age, tutorId], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
}

// Update a pet
function update(id, pet, callback) {
    const { name, species, breed, age, tutorId } = pet;
    const sql = 'UPDATE pets SET name=?, species=?, breed=?, age=?, tutorId=? WHERE id=?';
    db.run(sql, [name, species, breed, age, tutorId, id], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
}

// Delete a pet
function deleteById(id, callback) {
    db.run('DELETE FROM pets WHERE id = ?', [id], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};
