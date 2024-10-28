const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite', (err) => {
   if (err) {
      console.error('Could not connect to database', err);
   } else {
      console.log('Connected to SQLite database');
   }
});

// Crée les tables si elles n'existent pas
db.serialize(() => {
   db.run(`
      CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE,
         password TEXT
      )
   `);

   db.run(`
      CREATE TABLE IF NOT EXISTS logs (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         user_id INTEGER,
         action TEXT,
         timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (user_id) REFERENCES users(id)
      )
   `);
});

module.exports = db;
