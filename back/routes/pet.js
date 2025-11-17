const express = require('express');
const router = express.Router();
const petModel = require('../models/petModel');
const { authenticateToken } = require('../middleware/auth');

// GET /pets
router.get('/', (req, res) => {
  petModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// GET /pets/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  petModel.getById(id, (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Pet not found' });
    res.json(row);
  });
});

// POST /pets
router.post('/', authenticateToken, (req, res) => {
  const petData = req.body;
  petModel.create(petData, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: result.id, ...petData });
  });
});

// PUT /pets/:id
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const petData = req.body;
  petModel.update(id, petData, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.changes === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json({ id, ...petData });
  });
});

// DELETE /pets/:id
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  petModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.changes === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted' });
  });
});

module.exports = router;