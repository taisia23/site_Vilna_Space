
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;


const db = new sqlite3.Database(path.join(__dirname, 'db', 'vilna_space.db'));


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));


const userRoutes = require('./routes/users')(db);
const productRoutes = require('./routes/products')(db);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`✅ Сервер працює на http://localhost:${port}`);
});
