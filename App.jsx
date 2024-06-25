import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/Navigations/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {PasswordProvider} from './src/screens/PasswordContext';

const App = () => {
  return (
    <PasswordProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </PasswordProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
