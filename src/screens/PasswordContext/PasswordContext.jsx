import React, {createContext, useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Auth/AuthContext';

const PasswordContext = createContext();

export const PasswordProvider = ({children}) => {
  const [passwords, setPasswords] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      loadPasswords();
    } else {
      setPasswords([]); 
    }
  }, [user]);

  const loadPasswords = async () => {
    if (!user) return;
    
    try {
      const passwordCollection = await firestore()
        .collection('passwords')
        .where('userId', '==', user.uid)
        .get();
      const passwordsFromFirestore = passwordCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPasswords(passwordsFromFirestore);
    } catch (error) {
      console.error('Error loading passwords from Firestore:', error);
    }
  };

  const addPassword = async (title, username, password) => {
    if (!user) return;
    
    try {
      const newPassword = {
        title, 
        username, 
        password,
        userId: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      const newDocRef = await firestore()
        .collection('passwords')
        .add(newPassword);
      setPasswords(prevPasswords => [
        ...prevPasswords,
        {id: newDocRef.id, ...newPassword},
      ]);
    } catch (error) {
      console.error('Error adding password to Firestore:', error);
    }
  };

  const editPassword = async (id, title, username, password) => {
    if (!user) return;
    
    try {
      const updatedPassword = {
        title, 
        username, 
        password,
        updatedAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore().collection('passwords').doc(id).update(updatedPassword);
      setPasswords(prevPasswords =>
        prevPasswords.map(item =>
          item.id === id ? {id, ...updatedPassword, userId: user.uid} : item,
        ),
      );
    } catch (error) {
      console.error('Error updating password in Firestore:', error);
    }
  };

  const deletePassword = async id => {
    if (!user) return;
    
    try {
      await firestore().collection('passwords').doc(id).delete();
      setPasswords(prevPasswords =>
        prevPasswords.filter(item => item.id !== id),
      );
    } catch (error) {
      console.error('Error deleting password from Firestore:', error);
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        addPassword,
        editPassword,
        deletePassword,
        loadPasswords,
      }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContext;