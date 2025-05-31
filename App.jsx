import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppNavigator from './src/Navigations/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {PasswordProvider} from './src/screens/PasswordContext/PasswordContext';
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen';
import {AuthProvider} from './src/Auth/AuthContext';
import { ThemeProvider } from './src/Theme/ThemeProvider';

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
      <AuthProvider>
        <PasswordProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </PasswordProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
