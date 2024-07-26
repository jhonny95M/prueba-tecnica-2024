import { useCallback, useContext, useEffect, useState } from "react";
import { all} from '../services/users'

export default function useUser() {
    console.log('useUser')
    const [users, setUsers] = useState([])
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    // const allUsers = 
    useEffect(() => {
        console.log('allusers')
        setState({ loading: true, error: false })
        all()
            .then(resp => {
                setState({ loading: false, error: false })
                setUser(resp)
            }).catch(e => {
                setState({ loading: false, error: true })
                console.error(e)
            })
    },[setUsers])
    // const logout = useCallback(()=>{
    //     window.sessionStorage.removeItem('oauth')
    //     setJwt(null)
    // },[setJwt])
    return
    {
        users
    }
}