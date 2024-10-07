import React, { createContext, useEffect, useState } from 'react';


export const authContext = createContext()


const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("movieToken") != null) {
            setToken(localStorage.getItem("movieToken"));
        }
    }, []);


    return <authContext.Provider value={{ token, setToken }}>
        {children}
    </authContext.Provider>
}

export default AuthContextProvider;
