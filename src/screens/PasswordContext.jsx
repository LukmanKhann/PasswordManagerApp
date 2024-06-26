import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Load passwords from Firestore on component mount
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    try {
      const passwordCollection = await firestore().collection('passwords').get();
      const passwordsFromFirestore = passwordCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPasswords(passwordsFromFirestore);
    } catch (error) {
      console.error('Error loading passwords from Firestore:', error);
    }
  };

  const addPassword = async (title, username, password) => {
    try {
      const newPassword = { title, username, password };
      const newDocRef = await firestore().collection('passwords').add(newPassword);
      setPasswords(prevPasswords => [...prevPasswords, { id: newDocRef.id, ...newPassword }]);
    } catch (error) {
      console.error('Error adding password to Firestore:', error);
    }
  };

  const editPassword = async (id, title, username, password) => {
    try {
      const updatedPassword = { title, username, password };
      await firestore().collection('passwords').doc(id).update(updatedPassword);
      setPasswords(prevPasswords =>
        prevPasswords.map(item => (item.id === id ? { id, ...updatedPassword } : item))
      );
    } catch (error) {
      console.error('Error updating password in Firestore:', error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await firestore().collection('passwords').doc(id).delete();
      setPasswords(prevPasswords => prevPasswords.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting password from Firestore:', error);
    }
  };

  return (
    <PasswordContext.Provider value={{ passwords, addPassword, editPassword, deletePassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContext;
