const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importation de la base de données
const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
   const { username, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);

   // Ajout d'un nouvel utilisateur dans la base de données
   db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword],
      (err) => {
         if (err) {
            return res.status(500).json({ message: 'User already exists' });
         }
         res.status(201).json({ message: 'User registered successfully' });
      }
   );
});

// Route de connexion
router.post('/login', (req, res) => {
   const { username, password } = req.body;

   // Récupère l'utilisateur depuis la base de données
   db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
      if (err || !user) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Vérification du mot de passe
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
         const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
         res.json({ token });
      } else {
         res.status(401).json({ message: 'Invalid credentials' });
      }
   });
});

module.exports = router;
