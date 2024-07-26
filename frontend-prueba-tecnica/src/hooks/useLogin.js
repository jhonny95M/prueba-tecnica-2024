import { useCallback, useContext, useState } from "react";
import Context from '../context/UserContext'
import loginService from '../services/login'

export default function useLogin() {
    /const [jwt, setJwt] = useState('null')//useContext(Context)
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const login = useCallback(({ username, password }) => {
        setState({ loading: true, error: false })
        loginService({ username, password })
            .then(jwt => {
                window.sessionStorage.setItem('oauth')
                setState({ loading: false, error: false })
                setJwt(jwt)
            }).catch(e => {
                window.sessionStorage.removeItem('oauth')
                setState({ loading: false, error: true })
                console.error(e)
            })
    },[setJwt])
    const logout = useCallback(()=>{
        window.sessionStorage.removeItem('oauth')
        setJwt(null)
    },[setJwt])
    return{
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError:state.error,
        login,
        logout
    }
}