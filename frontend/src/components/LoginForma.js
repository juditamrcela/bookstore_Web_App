import React, {useState,useEffect} from 'react';
import prijavaAkcije from '../services/login';
import knjigaAkcija from '../services/knjige';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
const LoginForma = () =>{
  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
  const [korisnik, postaviKorisnika] = useState();


  useEffect(()=>{
    const logiraniKorisnikJSON = localStorage.getItem("prijavljeniKorisnik");
    const value = JSON.parse(logiraniKorisnikJSON);
    postaviKorisnika(value)
    //knjigaAkcija.postaviToken(korisnik.token)
  },[])
  window.onload=function(){
    localStorage.removeItem('prijavljeniKorisnik');
  }

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
    <div className="container">
    {(korisnik===null)?(
       <Form onSubmit={userLogin}>
       
       <Form.Group className="mb-3" controlId="formBasicEmail">
           <Form.Label>Username: </Form.Label>
           <Form.Control type="text" value={username} name="Username" placeholder="username" className="form-control" onChange={(e)=>postaviUsername(e.target.value)} ></Form.Control>
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Label>Password: : </Form.Label>
           <Form.Control type="password" value={pass} name="Pass" placeholder="password" className="form-control" onChange={(e)=>postaviPass(e.target.value)}></Form.Control>
         </Form.Group>
         <Button className="button-primary" type="submit" id="loginButton">Prijava</Button>
         
       </Form>):(
         <h2>Dobro došli {korisnik.ime} </h2>
       )}
 </div>
)}

export default LoginForma;
