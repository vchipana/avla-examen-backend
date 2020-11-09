/********* CREA LA BD ***************/
CREATE DATABASE frontend_tareas;

USE frontend_tareas;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'vchipana';
flush privileges;
/************************************/

/********* CREA TABLAS **************/
CREATE TABLE Usuarios (
  usuarioID  int,
  nombres varchar(255),
  username varchar(255),
  password varchar(255)
);

CREATE TABLE Tareas (
  tareaID  int,
  descripcion varchar(255),
  indCompletado varchar(1),
  usuarioID int
);
/************************************/

/********** INSERTA DATA ************/
INSERT INTO Usuarios (usuarioID, nombres, username, password) VALUES (1, "Vanessa Chipana", "vchipana", "vchipana");
INSERT INTO Usuarios (usuarioID, nombres, username, password) VALUES (2, "Alessandro Chipana", "achipana", "achipana");
INSERT INTO Usuarios (usuarioID, nombres, username, password) VALUES (3, "Dina Isidro", "disidro", "disidro");
/************************************/