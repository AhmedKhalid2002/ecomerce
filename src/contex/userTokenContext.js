import { createContext, useState } from "react";

export let UserToken=createContext();

export default function UserTokenProvider({children}){

    let [userToken,setUserToken]=useState(null)
    return <UserToken.Provider value={{userToken,setUserToken}}>
        {children}
    </UserToken.Provider>
}