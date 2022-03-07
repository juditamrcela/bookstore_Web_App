import React, {useState, useEffect} from 'react';
import Knjiga from './components/Knjiga';
import axios from 'axios'
import './App.css'
import LoginForma from './components/LoginForma';
import knjigaAkcije from './services/knjige.js';
import NovaKnjiga from './components/NovaKnjiga';

const App = (props)=> {
   const [ knjiga, postaviKnjigu ] = useState([])
    const [ grada, postaviGradu ] = useState('')
    const [ naslov, postaviNaslov ] = useState('')
    const [ autor, postaviAutor ] = useState('')
    const [korisnik, postaviKorisnika] = useState(null);
    //komunikacija s posluziteljem-GET;dohvati sve knjige
    useEffect( () => {
	
      axios.get("http://localhost:3001/api/knjige")
    
      .then(res => postaviKnjigu(res.data))
    
    }, [])//prilikom renderirianja

    useEffect(() => {
      console.log('Effect');
  
      knjigaAkcije.dohvatiSve().then((response) => {
        postaviKnjigu(response.data);
      });
    }, []);
    useEffect(() => {
      const logiraniKorisnikJSON = window.localStorage.getItem(
        "prijavljeniKorisnik"
      );
      if (logiraniKorisnikJSON) {
        const korisnik = JSON.parse(logiraniKorisnikJSON);
        postaviKorisnika(korisnik);
        knjigaAkcije.postaviToken(korisnik.token);
      }
    }, []);
    const loginForma=()=>{
      return(
        <LoginForma/>
      )
    }
    const novaKnjiga=()=>(
      <NovaKnjiga
        spremiKnjigu={novaKnjiga}
        />
    )
    return(
      <div>

        
          <h1>Knjige</h1>
          {korisnik === null ? (
            loginForma()
          ) : (
            <div>
              <p>Prijavljeni ste kao {korisnik.ime}</p>
              {novaKnjiga()}
            </div>
      )}
     
          
          <table>
              <thead>
                  <tr>
                      <th className="th">POSUDENA</th>
                      <th className="th">GRADA</th>
                      <th className="th">NASLOV</th>
                      <th className="th">AUTOR</th>
                      
                  </tr>
              </thead>
              <tbody>
                  {knjiga.map(k=>
                    <Knjiga key={k.id} posudena={k.posudena} grada={k.grada} naslov={k.naslov} autor={k.autor}
                    
                    />)}
              </tbody>
             
          </table>
          
         
      </div>
  )
}

export default App;
