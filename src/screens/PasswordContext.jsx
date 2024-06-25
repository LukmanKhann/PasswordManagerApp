import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordContext = createContext();

export const PasswordProvider = ({children}) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    try {
      const passwordsFromStorage = await AsyncStorage.getItem('passwords');
      if (passwordsFromStorage !== null) {
        setPasswords(JSON.parse(passwordsFromStorage));
      }
    } catch (error) {
      console.error('Error loading passwords from AsyncStorage:', error);
    }
  };

  const savePasswords = async newPasswords => {
    try {
      await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
    } catch (error) {
      console.error('Error saving passwords to AsyncStorage:', error);
    }
  };

  const addPassword = (title, username, password) => {
    const newPassword = {id: Date.now().toString(), title, username, password};
    const newPasswords = [...passwords, newPassword];
    setPasswords(newPasswords);
    savePasswords(newPasswords); // Save updated passwords to AsyncStorage
  };

  return (
    <PasswordContext.Provider value={{passwords, addPassword}}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContext;
