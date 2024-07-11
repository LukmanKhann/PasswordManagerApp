import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Switch} from 'react-native-paper';
import {ThemeContext} from '../../Theme/ThemeProvider';

export default function SettingScreen() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#121212' : '#ffffff'},
      ]}>
      <Button
        style={[
          styles.button,
          {
            backgroundColor: theme === 'dark' ? '#ffffff' : '#121212',
            color: theme === 'dark' ? '#121212' : '#ffffff',
          },
        ]}
        mode="contained"
        onPress={handleLogout}>
        Logout
      </Button>
      <View style={styles.toggleContainer}>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    // width : '40%'
  },
  button: {
    backgroundColor: '#121212',
    marginBottom: 16,
  },
  toggleContainer: {
    alignItems: 'center',
  },
});
