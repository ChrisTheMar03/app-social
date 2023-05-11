const mysql = require('mysql')

const conexion = mysql.createConnection({
  host:"localhost",
  password:"root",
  user:"root",
  database:"db_social"
})


module.exports = conexion;

