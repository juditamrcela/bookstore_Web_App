import axios from 'axios';
//akcije s knjigama
const osnovniUrl = 'http://localhost:3001/api/knjige'

let token = null
const postaviToken = (noviToken) => {
    token = `bearer ${noviToken}`
}
 
const dohvatiSve = () => {   
    const config = {
        headers: {Authorization: token}
    }
    return axios.get(osnovniUrl,config);
}
 
const stvori = async noviObjekt => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.post(osnovniUrl, noviObjekt, config)
    return odgovor
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi = id => {
    const config = {
        headers: {Authorization: token}
    }
    return axios.delete(`${osnovniUrl}/${id}`, config)
}
 
export default { dohvatiSve, stvori, osvjezi, brisi, postaviToken}