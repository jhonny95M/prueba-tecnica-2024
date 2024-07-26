const URLBASE="https://localhost:7163/api"
 export const all = ()=>{
    return fetch(`${URLBASE}/users`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok)throw new Error("Error en el servicio de logueo")
            return res.json()
    }).then(res=>{
        return res
    })
}
export const getById=(id)=>{
    return fetch(`${URLBASE}/users/${id}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok)throw new Error("Error en el servicio de logueo")
            return res.json()
    }).then(res=>{
        return res
    })
}