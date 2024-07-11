import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppNavigator from './src/Navigations/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {PasswordProvider} from './src/screens/PasswordContext/PasswordContext';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen';
import {ThemeProvider} from './src/Theme/ThemeProvider';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <ThemeProvider>
      <PasswordProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </PasswordProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
