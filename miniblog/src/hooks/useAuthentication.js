import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';



export const useAuthentication = () => {
    const db = getFirestore();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const [cancelled, setCancelled] = useState(false);



    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();
    
        setLoading(true);
        setError(null);
    
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
    
            await updateProfile(user, {
                displayName: data.displayName
            });
    
            await setDoc(doc(db, 'users', user.uid), {
                displayName: data.displayName,
                email: data.email,
                age: data.age
            });
    
            setLoading(false);
    
            return user;
    
        } catch (error) {
            console.log(error.message);
    
            let systemErrorMessage;
    
            if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail already in use";
            } else {
                systemErrorMessage = "Oops... Something went wrong, please try again later";
            }
    
            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    const login = async (data) => {
        checkIfIsCancelled();
    
        setLoading(true);
        setError(null);
    
        try {
            const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
            return user;
        } catch (error) {
            let systemErrorMessage;
    
            if (error.message.includes('invalid')) {
                systemErrorMessage = 'Incorrect password or email';
            } else {
                systemErrorMessage = "Oops... Something went wrong, please try again later";
            }
    
            console.log(error.response ? error.response.data : error.message);
            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        logout,
        login,
        error,
        loading,
    };
};