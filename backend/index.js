const app = require('./app')  
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')



/*let knjige_pocetno = [
    {
      id: 1,
      posudeno: Date.now(),
      naslov:'The Chronicles of Narnia',
      autor:'C.S.Lewis'
     
    },
    {
        id: 2,
        posudeno: Date.now(),
        grada:"Gradska knjiznica Marka Marulica",
        naslov:'Žene koje trće s vukovima',
        autor:'Clarissa Pinkola Estes'
    },
    {
        id: 3,
        posudeno: Date.now(),
        naslov:'Emotions revealed',
        autor:'Paul Ekman'
    }
  ]*/
//izrada servera
const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server je pokrenut na portu ${config.PORT}`)
  })



