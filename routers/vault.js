const express = require('express');
const crypto = require('crypto');
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');
const { DEK } = require('../config/keys');
const router = express.Router();

// Fonction pour enregistrer un log
function logAction(userId, action) {
   db.run(
      `INSERT INTO logs (user_id, action) VALUES (?, ?)`,
      [userId, action],
      (err) => {
         if (err) console.error('Error logging action:', err);
      }
   );
}

// Chiffrement des données
router.post('/encrypt', authMiddleware, (req, res) => {
   const { data } = req.body;
   const cipher = crypto.createCipher('aes-256-ctr', DEK);
   let encryptedData = cipher.update(data, 'utf8', 'hex');
   encryptedData += cipher.final('hex');

   logAction(req.user.id, 'Data encrypted'); // Enregistre l’action
   res.json({ encryptedData });
});

// Déchiffrement des données
router.post('/decrypt', authMiddleware, (req, res) => {
   const { encryptedData } = req.body;
   const decipher = crypto.createDecipher('aes-256-ctr', DEK);
   let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
   decryptedData += decipher.final('utf8');

   logAction(req.user.id, 'Data decrypted'); // Enregistre l’action
   res.json({ decryptedData });
});

module.exports = router;
