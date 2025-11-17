const express = require('express');
const router = express.Router();
const tutorModel = require('../models/tutorModel');
const { authenticateToken } = require('../middleware/auth');

// GET /tutors
router.get('/', (req, res) => {
  tutorModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// GET /tutors/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  tutorModel.getById(id, (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Tutor not found' });
    res.json(row);
  });
});

// POST /tutors
router.post('/', authenticateToken, (req, res) => {
  const tutorData = req.body;
  tutorModel.create(tutorData, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: result.id, ...tutorData });
  });
});

// PUT /tutors/:id
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const tutorData = req.body;
  tutorModel.update(id, tutorData, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.changes === 0) return res.status(404).json({ message: 'Tutor not found' });
    res.json({ id, ...tutorData });
  });
});

// DELETE /tutors/:id
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  tutorModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.changes === 0) return res.status(404).json({ message: 'Tutor not found' });
    res.json({ message: 'Tutor deleted' });
  });
});

module.exports = router;
