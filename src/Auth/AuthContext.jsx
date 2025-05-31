import React, {createContext, useEffect, useState} from 'react';
import {FIREBASE_AUTH} from '../Firebase/FirebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; 
  }, []);
  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <AuthContext.Provider value={{user, loading, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
