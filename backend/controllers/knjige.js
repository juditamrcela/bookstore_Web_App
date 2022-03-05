const express = require('express');
const knjigeRouter=express.Router();
const Knjiga=require('../models/knjige')
const Korisnik=require('../models/korisnik')


//dohvacanje svih
knjigeRouter.get('/', async (req, res) => {
  console.log(knjigeRouter)
  const knjige = await Knjiga.find({})
    .populate('korisnik', { username: 1, ime: 1 })
  res.json(knjige)
})

//dohvacanje jednog
knjigeRouter.get('/:id', (req, res, next) => {
    Knjiga.findById(req.params.id)
      .then(knjiga => {
        if (knjiga) {
          res.json(knjiga)
        } else {
          res.status(404).end()
        }
  
      })
      .catch(err => next(err))
  })

  knjigeRouter.delete('/:id', (req, res) => {
    Knjiga.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(err => next(err))
  })
  
  knjigeRouter.put('/:id', (req, res) => {
    const podatak = req.body
    const id = req.params.id
  
    const knjiga = new Knjiga({
        posudeno: new Date(),
        grada: podatak.grada,
        naslov:podatak.naslov,
        autor: podatak.autor
      })
  
      Knjiga.findByIdAndUpdate(id,knjiga, {new: true})
    .then( novaKnjiga => {
      res.json(novaKnjiga)
    })
    .catch(err => next(err))
  
  })
  
  knjigeRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const logKorisnik=await Korisnik.findById(podatak.korisnik)
  
    const knjiga = new Knjiga({
        posudeno: new Date(),
        grada: podatak.grada,
        naslov:podatak.naslov,
        autor: podatak.autor,
        korisnik:logKorisnik._id
    })
  
   
    const spremljenaKnjiga=await knjiga.save()
    logKorisnik.knjige=logKorisnik.knjige.concat(spremljenaKnjiga._id)
    await logKorisnik.save()
    res.json(spremljenaKnjiga)
  })
  
  module.exports = knjigeRouter