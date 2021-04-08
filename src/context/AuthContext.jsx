import {createContext, useEffect, useState} from 'react';
import {auth} from '../firebase/config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({loading: true, data: null});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userState) => {
            setUser({loading: false, data: userState})
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}