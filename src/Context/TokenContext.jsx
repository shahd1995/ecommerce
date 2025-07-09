import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext(0)

export default function TokenContextProvider(props){
    const [UserToken, setUserToken] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem("UserToken") !== null){
            setUserToken(localStorage.getItem("UserToken"))
        }
    },[])

    return(
        <TokenContext.Provider value={{UserToken, setUserToken}}>
            {props.children}
        </TokenContext.Provider>
    )
}