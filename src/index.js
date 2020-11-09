const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const coneccionBD = require('./coneccion-bd');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', function (req, res) {
  coneccionBD.conectar(
    connection => {
      const consulta = 
        `SELECT * FROM Usuarios 
        WHERE username=${req.body.username}
        AND password=${req.body.password}`
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

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});