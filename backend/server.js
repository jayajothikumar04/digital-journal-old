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

// Route to delete a journal entry
app.delete('/delete-entry/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM entries WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('Entry deleted');
    });
  });
  

app.get('/entries', (req, res) => {
  const sql = 'SELECT * FROM entries';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});



// Route to add a task
app.post('/add-task', (req, res) => {
    const { task, due_date, due_time } = req.body;
    const sql = 'INSERT INTO tasks (task, due_date, due_time) VALUES (?, ?, ?)';
    db.query(sql, [task, due_date, due_time], (err, result) => {
        if (err) throw err;
        res.send('Task added');
    });
});


// Route to get all tasks (pending and completed)
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks ORDER BY due_date ASC, due_time ASC';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Route to update task as completed
app.put('/complete-task/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE tasks SET is_completed = TRUE WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Task marked as completed');
    });
});

// Route to delete all completed tasks
app.delete('/delete-completed-tasks', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE is_completed = TRUE';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Completed tasks deleted');
    });
});




// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
