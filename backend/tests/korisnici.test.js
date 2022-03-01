const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./test_pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Kada imamo samo jednog korisnika u bazi', () =>{
  beforeEach(async () => {
    await Korisnik.deleteMany({})

    const passHash = await bcrypt.hash('tajna', 10)
    const korisnik = new Korisnik({ime: 'Admin', username: 'admin', passHash})
    await korisnik.save()
  })
  afterAll(async ()=>{
      await mongoose.connection.close()
  })
})
