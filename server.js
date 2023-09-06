const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Server
app.listen(3304, () => {
  console.log('Your server run at port 3304');
});
// connection
const db = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'nanadb',
});
/////////////////////////////////////////////////// USER API //////////////////////////////////////////////////////////

// add new user
app.post('/InsertNewUser', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    'INSERT INTO usertbl (username, password) VALUES (?,?)',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('New User added successfull');
      }
    }
  );
});
//Update User
app.put('/updateUser', (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;

  const sqlUpdate =
    'UPDATE usertbl SET username = ?,  password= ? WHERE id = ?';
  db.query(sqlUpdate, [username, password, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Update Successfuul');
    }
  });
});
//Delete User
app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;

  const sqlDelete = 'DELETE FROM usertbl WHERE id = ?';
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Delete Successfuul', result);
    }
  });
});
//Get Users Data
app.get('/getUsers', (req, res) => {
  db.query('SELECT * FROM usertbl', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//get One User For Login
app.post('/login', (req, res) => {
  const userName = req.body.user;
  const password = req.body.pass;
  const sqlGetUser =
    'SELECT * FROM usertbl WHERE username = ? AND password = ?';
  db.query(sqlGetUser, [userName, password], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.send(result);
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////// COURSE API //////////////////////////////////////////////////////////

//Get Course Data
app.get('/getCourses', (req, res) => {
  db.query('SELECT * FROM course', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//Get One Course Data
app.get('/getCourse/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM course WHERE id = ?';
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//Update Course
app.put('/updateCourse', (req, res) => {
  const id = req.body.id;
  const name = req.body.name_dore;

  const sqlUpdate = 'UPDATE course SET name = ? WHERE id = ?';
  db.query(sqlUpdate, [name, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Update Course Successfuul', result);
    }
  });
});
//Delete Course
app.delete('/deleteCourse/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = 'DELETE FROM course WHERE id = ?';
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Delete Course Successfuul', result);
    }
  });
});
// add new Course
app.post('/InsertNewCourse', (req, res) => {
  const name = req.body.name_dore;

  db.query('INSERT INTO course (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('New Course added successfull', result);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
