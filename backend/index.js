const app = require('./app.js')
const conexion = require('./db/Conexion.js')
const PORT = 3001

conexion.connect((err)=>{
  if(err) throw err
  console.log("Conectado a mysql");
  app.listen(PORT,()=>{
    console.log(`Corriendo en el puerto ${PORT} `);
  })
})




