const mysql = require("mysql");

module.exports = {
  conectar: function(callbackSuccess, callbackError) {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'vchipana',
      database: 'frontend_tareas',
      port: 3306
    });
    
    let error;
    
    connection.connect(function(errorBD){
      if(errorBD){
        error = errorBD;
      }
    });

    if(error) {
      callbackError(error);
    } else {
      callbackSuccess(connection);
    }

    connection.end();
  }
}