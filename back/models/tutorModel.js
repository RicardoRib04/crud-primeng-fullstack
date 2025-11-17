const db = require('../db/database');

// Helper function to get pets for a tutor
function findPetsByTutorId(tutorId, callback) {
    db.all('SELECT * FROM pets WHERE tutor_id = ?', [tutorId], (err, rows) => {
        callback(err, rows);
    });
}

// Get all tutors
function getAll(callback) {
    db.all('SELECT * FROM tutores', [], (err, tutores) => {
        if (err) {
            return callback(err);
        }
        if (!tutores || tutores.length === 0) {
            return callback(null, []);
        }

        const promises = tutores.map(tutor => {
            return new Promise((resolve, reject) => {
                findPetsByTutorId(tutor.id, (err, pets) => {
                    if (err) {
                        return reject(err);
                    }
                    tutor.pets = pets || [];
                    resolve(tutor);
                });
            });
        });

        Promise.all(promises)
            .then(results => callback(null, results))
            .catch(err => callback(err));
    });
}

// Get tutor by ID
function getById(id, callback) {
    db.get('SELECT * FROM tutores WHERE id = ?', [id], (err, tutor) => {
        if (err) {
            return callback(err);
        }
        if (!tutor) {
            return callback(null, null);
        }
        findPetsByTutorId(id, (err, pets) => {
            if (err) {
                return callback(err);
            }
            tutor.pets = pets || [];
            callback(null, tutor);
        });
    });
}

// Create a new tutor
function create(tutor, callback) {
    const { nome, contato, endereco } = tutor;
    db.run(
        'INSERT INTO tutores (nome, contato, endereco) VALUES (?, ?, ?)',
        [nome, contato, endereco],
        function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID });
        }
    );
}

// Update a tutor
function update(id, tutor, callback) {
    const { nome, contato, endereco } = tutor;
    db.run(
        'UPDATE tutores SET nome = ?, contato = ?, endereco = ? WHERE id = ?',
        [nome, contato, endereco, id],
        function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { changes: this.changes });
        }
    );
}

// Delete a tutor
function deleteById(id, callback) {
    findPetsByTutorId(id, (err, pets) => {
        if (err) {
            return callback(err);
        }
        if (pets && pets.length > 0) {
            return callback(new Error('Não é possível deletar um tutor que possui pets associados.'));
        }

        db.run('DELETE FROM tutores WHERE id = ?', [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};
