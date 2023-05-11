const express = require('express')
const upload = require('multer')
const path = require('path')
const conexion = require('../db/Conexion.js')

const usuarioRouter = express.Router()

const FIND = "SELECT * FROM usuario WHERE idUser = ?"
const INSERT = "INSERT INTO usuario VALUES (null,?,?,?,?,?,?,?)"
const SESION = "SELECT * FROM usuario WHERE correo=? and contrasena=? limit 1"
// const FINDNAME = "SELECT * FROM usuario WHERE "
const VERIFYEMAIL = "SELECT idUser FROM usuario WHERE correo like concat( ? ,'%')"
 
usuarioRouter.get("/:id",(req,res)=>{
  const {id} = req.params

  conexion.query({sql:FIND},[id],(err,rs,fls)=>{
    if(err) throw err
    return res.status(200).send(rs);
  })

})

//Indicando que parametros va a tener la imagen
const storage = upload.diskStorage({
  destination:"public/", //destino
  filename:(req,file,cb)=>{ //nombre como guardar el archivo
    cb(null,Date.now()+path.extname(file.originalname))
  }
})

const multer = upload({
  storage,
  limits:{fileSize:5*1024*1024}, //2mb,
  // fileFilter:(req,file,cb)=>{
  //   console.log(file.mimetype); //obtene que tipo de archivo es
  // }
})

//TODO: Indicando que solo se subira un solo archivo
usuarioRouter.post("/crear",multer.single("imguser"),(req,res)=>{
  const { nombre,apellido,fechaNacimiento,sexo,correo,contrasena } = req.body;
  const { filename } = req.file
  const rutaImagen = `http://localhost:3001/public/${filename}`
  // console.log(filename); Nombre con .extension

  conexion.query({sql:INSERT},[nombre,apellido,fechaNacimiento,sexo,correo,contrasena,rutaImagen],
    (err,rs,fls)=>{
      if(err) throw err
      return res.status(200).send({ message:"success",response:true })
    })
})

usuarioRouter.get('/:correo/:password',(req,res)=>{
  const {correo,password} = req.params
  conexion.query({sql:SESION},[correo,password],
    (err,rs,flds)=>{
      if(err) throw err
      return res.status(200).send(rs)
  })
})

usuarioRouter.post("/verimail",(req,res)=>{
  const { correo } = req.body
  conexion.query({sql:`SELECT count(*) as cantidad FROM usuario WHERE correo like concat(?,'%') `},[correo],(err,rsl,fld)=>{
    if (err) throw err
    // console.log(rsl);
    return res.status(200).send(rsl)
  })
})


module.exports = {
  usuarioRouter
}





