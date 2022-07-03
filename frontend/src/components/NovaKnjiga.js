import React, {useState,useEffect} from "react";
import knjigeAkcije from '../services/knjige.js';

const NovaKnjiga = (props) => {
    const [unosGrada, postaviGrada] = useState("")
    const [unosNaslova, postaviNaslov] = useState("")
    const [unosAutora, postaviAutora] = useState("")
    const [unosProduziti,postaviProduziti]=useState(false)
    const [korisnik,postaviKorisnika]=useState(null)
    const [ knjiga, postaviKnjigu] = useState([])
    useEffect(()=>{
      const logKorisnik = localStorage.getItem("prijavljeniKorisnik");
      const value = JSON.parse(logKorisnik);
      postaviKorisnika(value)
      
    },[])
    window.onunload = function () {
      localStorage.removeItem('prijavljeniKorisnik');  
    }
    const promjenaGrade = (e) =>{
        postaviGrada(e.target.value)
    }
    const promjenaNaslov = (e) =>{
        postaviNaslov(e.target.value)
    }
    const promjenaAutora = (e) =>{
        postaviAutora(e.target.value)
    }
    
    const novaKnjiga = (e) => {
      try{
        e.preventDefault()
        var datum=new Date()
       const noviObjekt={
            posudeno:datum.getFullYear()+'-'+datum.getMonth()+'-'+datum.getDate(),
            vracanje:datum.getFullYear()+'-'+datum.getMonth()+'-'+datum.getDate()+5,
            grada: unosGrada,
            naslov: unosNaslova,
            autor:unosAutora,
            produziti:unosProduziti
        }
        knjigeAkcije.stvori(noviObjekt).then((res) => {
          postaviKnjigu(knjiga.concat(res.data))})
        postaviAutora('')
        postaviGrada('')
        postaviNaslov('')
        alert("Uspješno!")
      }catch(exception){
        window.alert("Nije uspjelo dodati novu knjigu...")
      }
       
    }
  return (
    <div>
      {(korisnik!==null)?(
      
        <form onSubmit={novaKnjiga}>
          
          <select  name="knjige_grada" id="grada" onChange={promjenaGrade}>
              <option value="Odaberi"  >Odaberi gradu...</option>
              <option value='Gradska knjiznica Marka Marulica' >Gradska knjiznica Marka Marulica</option>
              <option value="Gradska knjiznica Sinj" >Gradska knjiznica Sinj</option>
              <option value="Gradska knjiznica Solin" >Gradska knjiznica Solin</option>
              
          </select>
          <input placeholder="...unesi Naslov Knjige" value={unosNaslova} onChange={promjenaNaslov} />
          <input placeholder="...unesi autora knjige" value={unosAutora} onChange={promjenaAutora} />
          
          <button type="submit">Spremi</button>
        </form>
      ):(<h2>MOrate se prijaviti!</h2>
      )}
      
    </div>
  );
};
export default NovaKnjiga;
