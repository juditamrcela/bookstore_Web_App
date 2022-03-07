import React, {useState, useEffect} from 'react';
import prijavaAkcije from '../services/login';
import knjigaAkcija from '../services/knjige';
const LoginForma = () =>{
  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
  const [korisnik, postaviKorisnika] = useState(null);

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const korisnik = await prijavaAkcije.prijava({
        username,
        pass,
      });
      window.localStorage.setItem(
        "prijavljeniKorisnik",
        JSON.stringify(korisnik)
      );
      knjigaAkcija.postaviToken(korisnik.token);
      postaviKorisnika(korisnik);
      postaviUsername("");
      postaviPass("");
      console.log(korisnik);
    } catch (exception) {
      alert("Neispravni podaci");
    }
  };
  return(
  
  <form onSubmit={userLogin}>
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
      Lozinka:
      <input
        type="password"
        value={pass}
        name="Pass"
        onChange={(e)=>postaviPass(e.target.value)}
      />
    </div>
    <button type="submit">Prijava</button>
  </form>
)};

export default LoginForma;
