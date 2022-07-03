const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const knjigeRouter = require('./controllers/knjige')
const korisniciRouter = require('./controllers/korisnici')
const loginRouter=require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('Spajam se na', config.DB_URI)
//spajanje na bazu
mongoose.connect(config.DB_URI,)
.then(result => {
  logger.info("Spojeni smo na bazu");
}).catch(error => {
  logger.greska("Greška pri spajanju", error.message);
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.zahtjevInfo)


//izrada rute za knjige
app.use('/api/knjige', knjigeRouter)
//izrada rute za korisnika
app.use('/api/korisnici',korisniciRouter)
//login ruta
app.use('/api/login',loginRouter)

app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)

module.exports = app