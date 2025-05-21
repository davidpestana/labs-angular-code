const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '..', 'db', 'alerts.json');

// GET /api/alerts
router.get('/', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = JSON.parse(fs.readFileSync(filePath));
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(data.slice(start, end));
});

// POST /api/alerts
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const newAlert = {
    id: crypto.randomUUID(),
    ...req.body,
    timestamp: new Date().toISOString(),
  };
  data.push(newAlert);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(newAlert);
});

module.exports = router;
