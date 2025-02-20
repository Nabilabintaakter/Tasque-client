/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from "../../firebase/firebase.init";
// import axios from "axios";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const handleLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const handleSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const handleGoogleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser?.email) {
                setUser(currentUser)
            //     const { data } = await axios.post(
            //         `https://b10-a11-milescape-server.vercel.app/jwt`,
            //         {
            //             email: currentUser?.email,
            //         },
            //         { withCredentials: true }
            //     )
            // } else {
            //     setUser(currentUser)
            //     const { data } = await axios.get(
            //         `https://b10-a11-milescape-server.vercel.app/logout`,
            //         { withCredentials: true }
            //     )
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const handleUpdateProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        handleUpdateProfile,
        handleSignOut,
        handleLogin,
        handleGoogleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;