import React, { useState, useEffect } from 'react'
import {auth} from '../Firebase'
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user);
            setLoading(false);
             
        });

        return () =>{
            unsub();
        }
    }, [])

    if (loading){
        return <p>Loading...</p>
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}