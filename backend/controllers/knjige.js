const express = require('express');
const knjigeRouter=express.Router();
const Knjiga=require('../models/knjige')


//dohvacanje svih
knjigeRouter.get('/', (req, res) => {
  console.log(knjigeRouter)
  Knjiga.find({}).then(rezultat => {    
    res.json(rezultat)
  })
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
        autor: podatak.autor,
        naslov:podatak.naslov
      })
  
      Knjiga.findByIdAndUpdate(id,knjiga, {new: true})
    .then( novaKnjiga => {
      res.json(novaKnjiga)
    })
    .catch(err => next(err))
  
  })
  
  knjigeRouter.post('/', (req, res, next) => {
    const podatak = req.body
  
    const knjiga = new Knjiga({
        posudeno: new Date(),
        grada: podatak.grada,
        autor: podatak.autor,
        naslov:podatak.naslov
    })
  
    knjiga.save()
    .then(spremljenaKnjiga=> {
      res.json(spremljenaKnjiga)
    })
    .catch(err => next(err))
  })
  
  module.exports = knjigeRouter