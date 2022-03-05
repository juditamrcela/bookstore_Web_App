const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const korisnikSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    ime:String,
    passHash:String,
    knjige:[
        {
            type: mongoose.Schema.Types.ObjectId,//niz objekata
            ref: 'Knjiga'//mongoos koristi kao referencu
        }
    ]

})
korisnikSchema.plugin(uniqueValidator)
//mijenjam funkciju toJSON
korisnikSchema.set('toJSON',{
    transform:(doc,ret)=>{
        ret.id=ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passHash//kada saljemo sa servera podataka nece se vidjeti hash
        return ret
    }
})

const Korisnik = mongoose.model('Korisnik',korisnikSchema,'korisnici')
module.exports=Korisnik