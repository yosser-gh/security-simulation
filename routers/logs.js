const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
   db.all(`SELECT * FROM logs WHERE user_id = ?`, [req.user.id], (err, rows) => {
      if (err) {
         return res.status(500).json({ message: 'Error retrieving logs' });
      }
      res.json(rows);
   });
});

module.exports = router;
