const app = require('./app')  
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
app.use(cors())
app.use(express.json())
const knjigeRouter = require('express').Router()
const Knjiga=require('./models/knjige')
let knjige_pocetno = [
    {
      id: 1,
      posudeno: Date.now(),
      naslov:'The Chronicles of Narnia',
      autor:'C.S.Lewis'
     
    },
    {
        id: 2,
        posudeno: Date.now(),
        naslov:'Žene koje trće s vukovima',
        autor:'Clarissa Pinkola Estes'
    },
    {
        id: 3,
        posudeno: Date.now(),
        naslov:'Emotions revealed',
        autor:'Paul Ekman'
    }
  ]
//izrada servera
//const server = http.createServer(app)




//dohvacanje svih  
app.get('/api/knjige', (req, res) =>{
    Knjiga.find({}).then(rezultat=>{
        res.json(rezultat)})
    
  })

//DOHVACANJE JEDNE
app.get('/api/knjige/:id', (req, res) => {
    const id = Number(req.params.id)
    const trosak = troskovi.find(t => t.id === id)

    if (trosak) {
        res.json(trosak)
    } else {
        res.status(404).end()
    }
})

//BRISANJE
app.delete('/api/knjige/:id', (req, res) => {
    const id = Number(req.params.id)

    res.status(204).end()
})
//DODAVANJE
app.post('/api/knjige', (req, res) => {
    const podatak = req.body

    if (!podatak.naslov) {

        return res.status(400).json({
            error: 'Nedostaje naslov knjige'
        })
    }
    if (!podatak.autor) {
        return res.status(400).json({
            error: 'Nedostaje ime autora'
        })
    }

    let knjiga = {
        id: generirajId(),
        posudeno: new Date(),
        grada: new podatak.grada,
        naslov: podatak.naslov,
        autor: podatak.autor
    }

    //knjiga = knjige_pocetno.concat(knjiga)
    knjiga.save().then(rezultat=>{
        res.json(rezultat)
    })
    //res.json(knjiga)
})

app.put('/api/knjige/:id', (req, res) => {

    const podatak = req.body
    const id = Number(req.params.id)
    knjige_pocetno = knjige_pocetno.map(t => t.id !== id ? t : podatak)
    console.log(knjige_pocetno)

    res.json(podatak)
})
//fnkcije
const generirajId = () => {
    const maxId = poruke.length > 0
      ? Math.max(...poruke.map(p => p.id))
      : 0
    return maxId + 1
  }
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
  