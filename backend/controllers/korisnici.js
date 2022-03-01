const korisniciRouter = require('express').Router()
const Korisnik = require('../models/korisnik')
const bcrypt=require('bcrypt')
const { run } = require('jest')

korisniciRouter.get('/', (req, res) => {
    console.log(korisniciRouter)
    Korisnik.find({}).then(rezultat => {    
      res.json(rezultat)
    })
})

korisniciRouter.post('/', async (req,res)=>{
    const sadrzaj=req.body

    const runde=10
    const passHash=await bcrypt.hash(sadrzaj.pass,runde)

    const korisnik=new Korisnik({
        username: sadrzaj.username,
        ime: sadrzaj.ime,
        passHash: passHash,//u bazu ne spremamo sifru,ona je kriptirana
        knjige: []//i ne treba nam
    })

    const spremiKorisnik=await korisnik.save()
    res.json(spremiKorisnik)
})


module.exports = korisniciRouter