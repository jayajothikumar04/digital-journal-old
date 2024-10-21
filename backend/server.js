const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'journal_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.post('/add-entry', (req, res) => {
  const { title, content, date } = req.body;
  const sql = 'INSERT INTO entries (title, content, date) VALUES (?, ?, ?)';
  db.query(sql, [title, content, date], (err, result) => {
    if (err) throw err;
    res.send('Entry added');
  });
});

app.get('/entries', (req, res) => {
  const sql = 'SELECT * FROM entries';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
