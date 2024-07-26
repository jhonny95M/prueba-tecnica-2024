import React,{ useEffect, useState } from "react"

const Context = React.createContext({})
export function UserContextProvider({childern}){
    const [jwt,SetJwt]=useState(()=>window.sessionStorage.getItem('oauth'))
    // useEffect(()=>{
    //     if(!jwt)return
    // })

    return <Context.Provider value={{
        jwt,
        SetJwt
    }}>
        {childern}
    </Context.Provider>
}

export default Context