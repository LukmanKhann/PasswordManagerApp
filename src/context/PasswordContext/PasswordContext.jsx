import React, {createContext, useEffect, useState, useContext} from 'react';
import database from '@react-native-firebase/database';
import {AuthContext} from '../../Auth/AuthContext';
import CryptoJS from 'crypto-js';
import {
  getCurrentFormattedDate,
  handleFirebaseTimestamp,
} from '../../utils/dateUtils';

const PasswordContext = createContext();

export const PasswordProvider = ({children}) => {
  const [passwords, setPasswords] = useState([]);
  const {user} = useContext(AuthContext);

  const getEncryptionKey = () => {
    if (!user) return null;
    return CryptoJS.SHA256(
      user.uid + '6xDSGdNxFBP1ZMuuFdNQOFTrfVkmKF8i',
    ).toString();
  };

  const encryptData = data => {
    const key = getEncryptionKey();
    if (!key) return data;
    return CryptoJS.AES.encrypt(data, key).toString();
  };

  const decryptData = encryptedData => {
    const key = getEncryptionKey();
    if (!key) return encryptedData;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      return encryptedData;
    }
  };

  // Keep legacy method names for backward compatibility
  const encryptPassword = password => encryptData(password);
  const decryptPassword = encryptedPassword => decryptData(encryptedPassword);

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
      const passwordsRef = database().ref(`passwords/${user.uid}`);
      const snapshot = await passwordsRef.once('value');

      if (snapshot.exists()) {
        const passwordsData = snapshot.val();
        const passwordsArray = Object.keys(passwordsData).map(key => {
          const passwordData = passwordsData[key];
          return {
            id: key,
            title: passwordData.title,
            username: decryptData(passwordData.username),
            password: decryptData(passwordData.password),
            createdAt: handleFirebaseTimestamp(passwordData.createdAt),
            updatedAt: handleFirebaseTimestamp(passwordData.updatedAt),
            category: passwordData.category || 'General',
          };
        });
        setPasswords(passwordsArray);
      } else {
        setPasswords([]);
      }
    } catch (error) {
      console.error('Error loading passwords from Realtime Database:', error);
    }
  };

  const addPassword = async (
    title,
    username,
    password,
    category,
  ) => {
    if (!user) return;

    try {
      const passwordsRef = database().ref(`passwords/${user.uid}`);
      const newPasswordRef = passwordsRef.push();

      const newPassword = {
        title,
        username: encryptData(username),
        password: encryptData(password),
        createdAt: getCurrentFormattedDate(),
        updatedAt: getCurrentFormattedDate(),
        category: category || 'General',
      };

      await newPasswordRef.set(newPassword);

      setPasswords(prevPasswords => [
        ...prevPasswords,
        {
          id: newPasswordRef.key,
          title,
          username,
          password,
          createdAt: getCurrentFormattedDate(),
          updatedAt: getCurrentFormattedDate(),
          category: category || 'General',
        },
      ]);
    } catch (error) {
      console.error('Error adding password to Realtime Database:', error);
    }
  };

  const editPassword = async (
    id,
    title,
    username,
    password,
    category,
  ) => {
    if (!user) return;

    try {
      const passwordRef = database().ref(`passwords/${user.uid}/${id}`);

      const updatedPassword = {
        title,
        username: encryptData(username),
        password: encryptData(password),
        updatedAt: getCurrentFormattedDate(),
        category: category || 'General',
      };

      await passwordRef.update(updatedPassword);

      setPasswords(prevPasswords =>
        prevPasswords.map(item =>
          item.id === id
            ? {
                ...item,
                title,
                username,
                password,
                updatedAt: getCurrentFormattedDate(),
                category: category || 'General',
              }
            : item,
        ),
      );
    } catch (error) {
      console.error('Error updating password in Realtime Database:', error);
    }
  };

  const deletePassword = async id => {
    if (!user) return;

    try {
      const passwordRef = database().ref(`passwords/${user.uid}/${id}`);
      await passwordRef.remove();

      setPasswords(prevPasswords =>
        prevPasswords.filter(item => item.id !== id),
      );
    } catch (error) {
      console.error('Error deleting password from Realtime Database:', error);
    }
  };

  const setupRealtimeListener = () => {
    if (!user) return;

    const passwordsRef = database().ref(`passwords/${user.uid}`);
    const onDataChange = snapshot => {
      if (snapshot.exists()) {
        const passwordsData = snapshot.val();
        const passwordsArray = Object.keys(passwordsData).map(key => {
          const passwordData = passwordsData[key];
          return {
            id: key,
            title: passwordData.title,
            username: decryptData(passwordData.username),
            password: decryptData(passwordData.password),
            createdAt: handleFirebaseTimestamp(passwordData.createdAt),
            updatedAt: handleFirebaseTimestamp(passwordData.updatedAt),
            category: passwordData.category || 'General',
          };
        });
        setPasswords(passwordsArray);
      } else {
        setPasswords([]);
      }
    };

    passwordsRef.on('value', onDataChange);

    return () => passwordsRef.off('value', onDataChange);
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        addPassword,
        editPassword,
        deletePassword,
        loadPasswords,
        setupRealtimeListener,
      }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContext;
