const express = require('express')
const cors = require('cors')
const {usuarioRouter} = require('./routes/UsuarioRouter')
const {publicacionRouter} = require('./routes/PublicacionRouter')
const app = express()
const URL = "/api/v1"

//* Midleware - intermediario

app.use( cors() )
app.use( express.json() )
app.use("/public",express.static("public/"))
app.use("/publications",express.static("publications/"))
app.use(URL+"/usuario",usuarioRouter)
app.use(URL+"/publicacion",publicacionRouter)

module.exports = app