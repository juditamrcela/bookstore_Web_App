import React, {useState} from "react";
import knjigaAkcije from '../services/knjige'

const NovaKnjiga = (props) => {
    const [unosGrada, postaviGrada] = useState("")
    const [unosNaslova, postaviNaslov] = useState("")
    const [unosAutora, postaviAutora] = useState("")
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
        e.preventDefault()
        var datum=new Date()
        props.spremiKnjigu({
            posudeno:datum.getFullYear()+'-'+datum.getMonth()+'-'+datum.getDate(),
            grada: unosGrada,
            naslov: unosNaslova,
            autor:unosAutora
        })
        
        postaviAutora('')
        postaviGrada('')
        postaviNaslov('')
    }
  return (
    <div>
      <h2>Stvori novu knjigu</h2>
      <form onSubmit={novaKnjiga}>
        
        <select  name="knjige_grada" id="grada">
            <option value="Odaberi" onChange={promjenaGrade} >Odaberi gradu...</option>
            <option value="MarkaMarulica" onChange={promjenaGrade}>Gradska knjiznica Marka Marulica</option>
            <option value="Sinj" onChange={promjenaGrade}>Gradska knjiznica Sinj</option>
            <option value="Solin" onChange={promjenaGrade}>Gradska knjiznica Solin</option>
            
        </select>
        <input placeholder="...unesi Naslov Knjige" value={unosNaslova} onChange={promjenaNaslov} />
        <input placeholder="...unesi autora knjige" value={unosAutora} onChange={promjenaAutora} />
        
        <button type="submit">Spremi</button>
      </form>
    </div>
  );
};
export default NovaKnjiga;