import React, {useState,useEffect} from 'react';
import registracijaAkcije from '../services/registracija.js';
import knjigaAkcija from '../services/knjige';


const RegistracijaForma = () =>{
    const [username, postaviUsername] = useState("");
    const [ime,postaviIme]=useState("");
    const [pass, postaviPass] = useState("");
    const [pass2,postaviPass2]=useState("");
    const [korisnik, postaviKorisnika] = useState();
    
    useEffect(() => {
        const logiraniKorisnikJSON = window.localStorage.getItem(
          "prijavljeniKorisnik"
        );
        if (logiraniKorisnikJSON) {
          const korisnik = JSON.parse(logiraniKorisnikJSON);
          postaviKorisnika(korisnik);
          knjigaAkcija.postaviToken(korisnik.token);
        }
      }, []);
      window.onload=function(){
        localStorage.removeItem('prijavljeniKorisnik');
      }
      const promijeniPass2 = (e) =>{
        postaviPass2(e.target.value)
      }
    const userRegistracija = async (e) => {
      e.preventDefault();
      if(pass2===pass){
        const korisnik = await registracijaAkcije.registracija({
            username,
            ime,
            pass
            
          });
          window.localStorage.setItem(
            "prijavljeniKorisnik",
            JSON.stringify(korisnik)
          );
        knjigaAkcija.postaviToken(korisnik.token);
        postaviKorisnika(korisnik);
         postaviUsername("");
        postaviIme("");
        postaviPass("");
      }
      else{
        alert("Imate razlicite lozinke!")
      }
    };
    return(
    <div className="container">
        {(korisnik===null)?(
            <form onSubmit={userRegistracija}>
            <div>
            Korisničko ime:
            <input
                type="text"
                value={username}
                name="Username"
                onChange={(e)=>postaviUsername(e.target.value)}
            />
            </div>
            <div>
            Ime i Prezime:
            <input
                type="text"
                value={ime}
                name="Ime"
                onChange={(e)=>postaviIme(e.target.value)}
            />
            </div>
            <div>
            Lozinka:
            <input
                type="password"
                value={pass}
                name="Pass"
                onChange={(e)=>postaviPass(e.target.value)}
            />
            </div>
            <div>
            Ponovite lozinku:
            <input
                type="password"
                value={pass2}
                placeholder="password"
                onChange={promijeniPass2}
            />
            </div>
            <button type="submit">Registriraj se</button>
        </form>):( 
            <h2>Dobro došli {ime}</h2>
            )}
    </div>
    
  )};
  
  export default RegistracijaForma;