import React from 'react'

const Knjiga = (props)=>{
    
   
    return(
        <tr>
            <td>{props.posudeno}</td>
            <td>{props.vracanje}</td>
            <td>{props.grada}</td>
            <td>{props.naslov}</td>
            <td>{props.autor}</td>
            <td>{props.produziti ? "Da" : "Ne"}</td>

            <td>
                
                <button onClick={props.brisi} id="button-brisi">Briši</button>
                <button onClick={props.urediKnjigu} id="button-uredi">Uredi</button>
            </td>
           
        </tr>
    )
}

export default Knjiga