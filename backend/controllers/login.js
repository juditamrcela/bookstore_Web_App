const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Korisnik = require('../models/korisnik') 
loginRouter.post('/', async (req, res) => {  
    const podatak=req.body//objekt koji ima {username,pass}

    const korisnik= await Korisnik.findOne({username:podatak.username})
    const passOK= korisnik===null ? 
    false : await bcrypt.compare(podatak.pass,korisnik.passHash)

    if(!(korisnik && passOK)){
        return res.status(401).json({
            error:"Ne postoji korisnik ili pogrešna lozinka"
        })
    }
    //dalje pisemo logiku ako je sve proslo OK
    //generiram token i saljem korisniku
    const userToken={
        username:korisnik.username,
        id:korisnik._id
    }
    //digitalni potpis
    const token=jwt.sign(userToken,process.env.SECRET)
    res.status(200).send({
        token,username:korisnik.username,ime:korisnik.ime
        //saljemo ime i user name zbog frontenda
    })

})
module.exports=loginRouter