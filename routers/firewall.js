const express = require('express');
const router = express.Router();

const allowedIPs = ['127.0.0.1']; // Exemples d’IP autorisées

router.use((req, res, next) => {
   if (!allowedIPs.includes(req.ip)) {
      return res.status(403).json({ message: 'Access denied: IP not allowed' });
   }
   next();
});

// Exemple d'une route protégée par le pare-feu
router.get('/protected-resource', (req, res) => {
   res.json({ message: 'You have access to this protected resource' });
});

module.exports = router;
