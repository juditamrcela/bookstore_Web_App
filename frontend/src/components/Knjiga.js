import React from 'react'

const Knjiga = (props)=>{
   
    return(
        <tr>
            <td>{props.posudeno}</td>
            
            <td>{props.grada}</td>
            <td>{props.naslov}</td>
            <td>{props.autor}</td>
            <td>
                <button onClick={props.urediKnjigu} id="button-uredi">Uredi</button>
                <button onClick={props.brisi} id="button-brisi">Briši</button>
            </td>
           
        </tr>
    )
}

export default Knjiga