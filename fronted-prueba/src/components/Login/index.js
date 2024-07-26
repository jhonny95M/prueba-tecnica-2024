import { useState } from "react"

export default function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword]= useState("")
    return(
        <>
        <form className="form">
            <label>username</label>
            <input placeholder="username" onchange={(e)=>setUsername(e.target.value)}
            value={username} />
        </form>
        </>
    )
}
