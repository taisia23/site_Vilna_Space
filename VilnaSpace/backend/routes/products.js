
const express = require('express');

module.exports = function (db) {
  const router = express.Router();


  router.get('/', (req, res) => {
    db.all('SELECT * FROM products ORDER BY id DESC', [], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Помилка завантаження товарів' });
      res.json(rows);
    });
  });


  router.post('/add', (req, res) => {
    const { name, description, image } = req.body;
    db.run(
      'INSERT INTO products (name, description, image) VALUES (?, ?, ?)',
      [name, description, image],
      function (err) {
        if (err) return res.status(500).json({ error: 'Помилка збереження товару' });
        res.json({ success: true, id: this.lastID });
      }
    );
  });

  return router;
};
