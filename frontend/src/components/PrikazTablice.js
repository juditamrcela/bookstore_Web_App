import React, {useState,useEffect} from 'react'
import Knjiga from './Knjiga.js';
import knjigaAkcije from '../services/knjige.js';
import 'bootstrap/dist/css/bootstrap.css'; 
import '../styles/table.css';


const PrikazTablice = ()=> {
    const [ knjiga, postaviKnjigu ] = useState([])
    const [korisnik, postaviKorisnika] = useState(null);
    const [filter,setfilter]=useState([]);
    useEffect(() => {
        const logiraniKorisnikJSON = window.localStorage.getItem(
          "prijavljeniKorisnik"
        );
        if (logiraniKorisnikJSON) {
          const korisnik = JSON.parse(logiraniKorisnikJSON);
          postaviKorisnika(korisnik);
          knjigaAkcije.postaviToken(korisnik.token);
        }
      }, [postaviKorisnika]);
    useEffect( () => {
     
       knjigaAkcije.dohvatiSve()
     
       .then(res => postaviKnjigu(res.data))
     
     }, [])//jednom prilikom prvog renderirianja komponente
     //GET sve knjige
     useEffect(()=>{
        knjigaAkcije.dohvatiSve().then((res) => setfilter(res.data));
      },[])
    
     
     const Filtracija=(value)=>{
      
        if(value==="Gradska knjiznica Marka Marulica"){
          postaviKnjigu(filter.filter(t => t.grada==="Gradska knjiznica Marka Marulica"))
        }
        else if(value==="Gradska knjiznica Sinj"){
            postaviKnjigu(filter.filter(t => t.grada==="Gradska knjiznica Sinj"))
        }else if(value==="Gradska knjiznica Solin"){
            postaviKnjigu(filter.filter(t => t.grada==="Gradska knjiznica Solin"))
          }
        else{
            knjigaAkcije.dohvatiSve().then((res) => postaviKnjigu(res.data));
        }
      }
       const brisiKnjigu = (id) => {
         try{
           knjigaAkcije.brisi(id).then((response) => {
             postaviKnjigu(knjiga.filter((k) => k.id !== id));
           }).then(response=>{setfilter(filter.filter(k=>k.id!==id))})
         }
         catch(exception){
           alert("Mozete brisati samo vlastite knjige!");
         }
        
       };
    
     const urediKnjigu =(id) =>{
       const nadiKnjigu=knjiga.find(k=>k.id===id)
       let prijeProduzi=nadiKnjigu.produziti;
       let novaProduziti=prompt(`Produziti ${nadiKnjigu.naslov}:?`)
       novaProduziti=novaProduziti.toLowerCase;
       novaProduziti=novaProduziti==="da" ? true : false;
       const modKnjiga ={
         ...nadiKnjigu,
         produziti:novaProduziti===null ? prijeProduzi : novaProduziti
       }
       knjigaAkcije.osvjezi(id, modKnjiga).then((response) => {
         console.log(response);
         postaviKnjigu(knjiga.map((p) => (p.id !== id ? p : response.data)));
       });
     }
     const [posudenoK, noviPosudenoK] = useState(0);
     useEffect(() => {
         let sumaPK = 0;
         let sumaNP=0;
         let nizProduzi = knjiga.filter(t => t.produziti === true);
         let nizNeP = knjiga.filter(t => t.produziti === false);
         sumaPK=nizProduzi.length;
         sumaNP=nizNeP.length;
         
         noviPosudenoK(sumaPK+sumaNP)
     }, [knjiga])
    
         
    
     
     return(
       <div>
 
         

           {korisnik === null ? (
             <h2>Morate se prijaviti!</h2>
           ) : (
             <>
                <div>
                    <p>Prijavljeni ste kao {korisnik.ime}</p>
                     
                 </div>
                 <div>
                    <button className='btn btn-secondary' value='Gradska knjiznica Marka Marulica' onClick={()=>Filtracija("Gradska knjiznica Marka Marulica")}>Filtriraj prema Knjiznici Marka Marulica</button>
                    <button className='btn btn-secondary' value='Gradska knjiznica Sinj' onClick={()=>Filtracija("Gradska knjiznica Sinj")}>Filtriraj prema Knjiznici Sinj</button>
                    <button className='btn btn-secondary' value='Gradska knjiznica Solin' onClick={()=>Filtracija("Gradska knjiznica Solin")}>Filtriraj prema Knjiznici Solin</button>
                    <button className='btn btn-secondary' value='Svi' onClick={()=>Filtracija("Svi")}>Svi</button>
                 </div>
                 <table class='container'>
                    <thead>
                        <tr>
                            <th className="th">POSUDENA</th>
                            <th className='th'>VRATITI</th>
                            <th className="th">GRADA</th>
                            <th className="th">NASLOV</th>
                            <th className="th">AUTOR</th>
                            <th className='th'>PRODUŽI</th>

                        </tr>
                    </thead>
                    <tbody>
                         {knjiga.map(k => <Knjiga
                            key={k.id}
                            posudeno={k.posudeno}
                            vracanje={k.vracanje}
                            grada={k.grada}
                            naslov={k.naslov}
                            autor={k.autor}
                            produziti={k.produziti}

                            brisi={() => brisiKnjigu(k.id)}
                            urediKnjigu={() => urediKnjigu(k.id)} 
                            />)}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td id="td">Ukupno:</td>
                        <td>{posudenoK}</td>
                        </tr>
                    </tfoot>

                </table>
                </>
       )}
      
           
           
           
          
       </div>
   )
 }
 
 export default PrikazTablice;