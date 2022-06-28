const korisniciRouter = require('express').Router()
const Korisnik = require('../models/korisnik')
const bcrypt=require('bcrypt')
const { run } = require('jest')

korisniciRouter.get('/', async (req, res) => {
    console.log(korisniciRouter)
    const korisnici=await Korisnik.find({}).populate('knjige',{naslov:1,autor:1})
    res.json(korisnici)
})

korisniciRouter.post('/', async (req,res)=>{
    const sadrzaj=req.body

    const runde=10
    const passHash=await bcrypt.hash(sadrzaj.pass,runde)

    const korisnik=new Korisnik({
        username: sadrzaj.username,
        ime: sadrzaj.ime,
        passHash: passHash,//u bazu ne spremamo sifru,ona je kriptirana
        _id:sadrzaj._id
       
    })

    const spremiKorisnik=await korisnik.save()
    res.json(spremiKorisnik)
})


module.exports = korisniciRouter