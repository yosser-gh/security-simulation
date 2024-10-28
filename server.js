require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const vaultRoutes = require('./routes/vault');
const firewallRoutes = require('./routes/firewall');
const app = express();

// Middleware pour traiter les données JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/vault', vaultRoutes);
app.use('/firewall', firewallRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
