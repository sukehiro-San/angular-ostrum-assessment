const express = require('express');
const router = express.Router();
const users = require('../data/users');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const match = users.find(u => u.username === username && u.password === password);
  match ? res.json({ success: true }) : res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;
