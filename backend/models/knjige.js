const mongoose = require('mongoose')
//schema
const knjigaSchema = new mongoose.Schema({
  posudeno: {
    type: Date
    //required: true
  },
  vracanje:{
    type: Date

  },
  grada: {
    type: String,
    //minlength: 5
    required: true
  },
  naslov: {
    type: String,
    require:true
  },
  autor: {
    type: String,
    minlength: 5,
    required: true
  },
  produziti:{
    type:Boolean,
    defalut: false

  },
  korisnik:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Korisnik'
  }
  
  
})

knjigaSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})
//model
module.exports = mongoose.model('Knjiga', knjigaSchema, 'knjige')