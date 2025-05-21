const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '..', 'db', 'plants.json');

// GET /api/plants
router.get('/', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = JSON.parse(fs.readFileSync(filePath));
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(data.slice(start, end));
});

// GET /api/plants/:id
router.get('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const plant = data.find(p => p.id === req.params.id);
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).json({ error: 'Planta no encontrada' });
  }
});

module.exports = router;
