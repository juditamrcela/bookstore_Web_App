const Knjiga = require('../models/knjiga')	
const Korisnik = require('../models/korisnik')	

let knjige_pocetno = [
  {
    id: 1,
    posudeno:'2019-05-30T19:20:14.298Z',
    grada:"Gradska knjiznica Marka Marulica",
    naslov:'The Chronicles of Narnia',
    autor:'C.S.Lewis'
   
  },
  {
      id: 2,
      posudeno: '2019-05-30T17:30:31.098Z',
      grada:"Gradska knjiznica Marka Marulica",
      naslov:'Becoming bulletproof',
      autor:'Evy Poumpouras'
  },
  {
      id: 3,
      posudeno: '2019-05-30T18:39:34.091Z',
      grada:"Gradska knjiznica Marka Marulica",
      naslov:'Emotions revealed',
      autor:'Paul Ekman'
  }
]

const knjigeIzBaze = async () => {
  const knjige = await Knjiga.find({})
  return knjige.map(p => p.toJSON())
}

const korisniciUBazi = async () => {
  const korisnici = await Korisnik.find({})
  return korisnici.map(k => k.toJSON())
}


module.exports = {
  knjige_pocetno, knjigeIzBaze, korisniciUBazi
}