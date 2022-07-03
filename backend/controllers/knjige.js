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
knjigeRouter.get('/:id', async (req, res, next) => {
  const token=dohvatiToken(req)
  const dekodiraniToken=jwt.verify(token,process.env.SECRET)
  if(!token || !dekodiraniToken.id){
    return res.status(401).json({error:"Neispravni token"})
  }
  const korisnik = await Korisnik.findById(dekToken.id)
  const id = req.params.id
  var k =await Knjiga.findById(id);
    if(k && String(k.korisnik)===String(korisnik_.id)){
      res.status(200).json(k).end()
    }
    else{
      res.status(404).end()
    }
    
  })
  knjigeRouter.delete('/:id', async (req, res) => {
    const token = dohvatiToken(req)
    const id = req.params.id
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'Neispravni token'})
    }
    //pronaden u bazi
    const korisnik = await Korisnik.findById(dekToken.id)
    const originalniPodatak = await Knjiga.findById(id)
    if (String(korisnik._id) !== String(originalniPodatak.korisnik)) {
        return res.status(401).json({ error: "niste autor podatka" })
    }

    //brisi
    await Knjiga.findByIdAndRemove(id)

    //brisi i id iz korisnikove liste podataka
    korisnik.podaci = korisnik.knjige.filter(p => String(p) != String(originalniPodatak._id))
    await korisnik.save()

    res.status(204).end()
  })
  
  knjigeRouter.put('/:id', (req, res) => {
    const podatak = req.body
    const id = req.params.id
    
    const knjiga = new Knjiga({
        posudeno: new Date(),
        vracanje: new Date(),
        grada: podatak.grada,
        naslov:podatak.naslov,
        autor: podatak.autor,
        produziti: podatak.produziti,
        korisnik:logKorisnik._id
       
        
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
        vracanje: new Date(),
        grada: podatak.grada,
        naslov:podatak.naslov,
        autor: podatak.autor,
        produziti: podatak.produziti,
        korisnik:logKorisnik._id
        
        
        
    })
    console.log(knjiga)
    if(!podatak.naslov){
      return res.status(400).json({
        error:'Nedostaje naslov knjige'
      })
    }
    if(!podatak.autor){
      return res.status(400).json({
        error:'Nedostaje autor'
      })
    }
    const spremljenaKnjiga=await knjiga.save()
    console.log(spremljenaKnjiga)
    logKorisnik.knjige=logKorisnik.knjige.concat(spremljenaKnjiga._id)
    console.log(logKorisnik)
    await logKorisnik.save()
    res.json(spremljenaKnjiga)
  
    
  })
  
  module.exports = knjigeRouter