const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
   const token = req.headers['authorization'];
   if (!token) return res.status(403).json({ message: 'Access denied' });

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
   });
}

module.exports = authMiddleware;
