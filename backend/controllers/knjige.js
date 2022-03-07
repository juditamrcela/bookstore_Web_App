const express = require('express');
const knjigeRouter=express.Router();
const Knjiga=require('../models/knjige')
const Korisnik=require('../models/korisnik')
const jwt=require('jsonwebtoken')

const dohvatiToken=(req)=>{
  //dohvati zaglavlje
  const auth=req.get('Authorization')
  if(auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }

  return null
}

//dohvacanje svih s odredenim userom
knjigeRouter.get('/', async (req, res) => {
  
  /*const knjige = await Knjiga.find({})
    .populate('korisnik', { username: 1, ime: 1 })
  res.json(knjige)*/
  const podatak=req.body
  const token=dohvatiToken(req)
  if(token){
    const dekodiraniToken=jwt.verify(token,process.env.SECRET)
    if(!token || !dekodiraniToken.id){
      return res.status(401).json({error:'Neispravni token'})
    }
    const logKorisnik=await Korisnik.findById(dekodiraniToken.id)
    const knjige=await Knjiga.find({})//sve knjige
    if(knjige.length===0){
      return res.status(400).json({error:'Nema knjiga u bazi'})

    }
    const dohvaceneKnjige=await knjige.map((k)=>{
      console.log(k)
      console.log(logKorisnik._id)
      if(logKorisnik._id==k.korisnik.valueOf()){
        return k
      }

    })
    var filtirane=dohvaceneKnjige.filter(function(el){
      return el!=null
    })
    res.json(filtirane)
  }
  else{
    const knjige=await Knjiga.find({})
    .populate('korisnik',{username:1,ime:1})
    if(knjige.length!=0){
      res.json(knjige)
    }
    else{
      return res.status(400).json({error:'Baza knjiga je prazana'})
    }
  }



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

  knjigeRouter.delete('/:id', async (req, res) => {
    const token=dohvatiToken(req)

    const dekodiraniToken=jwt.verify(token,process.env.SECRET)
    if(!token || !dekodiraniToken.id){
      return res.status(401),json({error:"Neispravni token"})
    }
    //pronaden u bazi
    
  const rez = await Knjiga.findOneAndDelete({_id:  mongoose.Types.ObjectId(req.params.id) ,korisnik: mongoose.Types.ObjectId(dekodiraniToken.id) })
  console.log(rez)
  if(rez)
    res.send(rez)
  else
    res.status(204).send({message: "Ne postoji traženi podatak"})
    /*Knjiga.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(err => next(err))*/
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
    const token=dohvatiToken(req)
    const dekodiraniToken=jwt.verify(token,process.env.SECRET)
    if(!token || !dekodiraniToken.id){
      return res.status(401).json({error:"Neispravni token"})
    }
    //pronaden u bazi
    const logKorisnik=await Korisnik.findById(dekodiraniToken.id)
    console.log(logKorisnik)
    const knjiga = new Knjiga({
        posudeno: new Date(),
        grada: podatak.grada,
        naslov:podatak.naslov,
        autor: podatak.autor,
        korisnik:logKorisnik._id
    })
    console.log(knjiga)
   
    const spremljenaKnjiga=await knjiga.save()
    console.log(spremljenaKnjiga)
    logKorisnik.knjige=logKorisnik.knjige.concat(spremljenaKnjiga._id)
    console.log(logKorisnik)
    await logKorisnik.save()
    res.json(spremljenaKnjiga)
  
    
  })
  
  module.exports = knjigeRouter