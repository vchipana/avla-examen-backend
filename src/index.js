const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const coneccionBD = require('./coneccion-bd');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.post('/login', function (req, res) {
  coneccionBD.conectar(
    connection => {
      const consulta = 
        `SELECT * FROM Usuarios 
        WHERE username="${req.body.username}"
        AND password="${req.body.password}"`
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          res.send(error);
        } else {
          if(results.length == 0) {
            res.send({});
          } else {
            const usuario = results[0];
            usuario.password = undefined;
            res.send(usuario);
          }
        }
      });
    },
    error => {
      res.send(error);
    }
  );
});

app.get('/usuarios', function (req, res) {
  coneccionBD.conectar(
    connection => {
      connection.query('SELECT * FROM Usuarios', function (error, results, fields) {
        if (error) {
          res.send(error);
        } else {
          res.send(results);
        }
      });
    },
    error => {
      res.send(error);
    }
  );
});

app.post('/tarea', function (req, res) {
  coneccionBD.conectar(
    connection => {
      const consulta = `
        INSERT INTO Tareas (descripcion, indCompletado, usuarioID) 
        VALUES ("${req.body.descripcion}", "N", ${req.body.usuarioID || null})
      `
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          res.send(error);
        } else {
          res.send(results);
        }
      });
    },
    error => {
      res.send(error);
    }
  );
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});