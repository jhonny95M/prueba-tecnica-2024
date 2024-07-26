const URLBASE="https://localhost:7163/api"
export default function login({username,password}){
    return fetch(`${URLBASE}//Auth/login`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(username,password)
    }).then(res=>{
        if(!res.ok)throw new Error("Error en el servicio de logueo")
            return res.json()
    }).then(res=>{
        const { jwt }= res
        return jwt
    })
}