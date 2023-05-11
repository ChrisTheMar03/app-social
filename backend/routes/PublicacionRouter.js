const express = require('express')
const multer = require('multer')
const path = require('path')
const conexion = require('../db/Conexion.js')

const publicacionRouter = express.Router()

const FIND = "SELECT * FROM publicacion WHERE idPublicacion = ?"
const ALL = "SELECT p.idPublicacion,p.imagen as imagen,texto,fecha,likes,u.nombre,u.sexo,u.imagen as imgUser FROM publicacion p inner join usuario u on u.idUser=p.idUser order by p.idPublicacion desc"
const ADD = "INSERT INTO publicacion VALUES (null,?,?,?,?,?)"

publicacionRouter.get("/:id",(req,res)=>{
  const {id} = req.params
  conexion.query({sql:FIND},[id],(err,rsl,fl)=>{
    if(err) throw err 
    return res.status(200).send(rsl)   
  })
})

const storage = multer.diskStorage({
  destination:'publications/',
  filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits:5*1024*1024 //5mb
})

publicacionRouter.post('/subir',upload.single("imgpublic"),(req,res)=>{
  const {texto,likes,idUser,fecha} = req.body
  const {filename} = req.file
  const rutaImange = `http://localhost:3001/publications/${filename}`

  conexion.query({sql:ADD},[rutaImange,texto,fecha,likes,idUser],
    (err,rsl,fld)=>{
      if(err) throw err
      return res.status(200).send({response:"success",value:true})
    })

})

publicacionRouter.get("/",(req,res)=>{
  conexion.query({sql:ALL},(err,rsl,flds)=>{
    if(err) throw err
    return res.status(200).send(rsl)
  })
})


module.exports ={
  publicacionRouter
}

