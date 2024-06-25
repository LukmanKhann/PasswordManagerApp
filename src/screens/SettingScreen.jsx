import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export default function SettingScreen() {
  const handleLogout = () => {
    // Handle logout logic
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button} mode="contained" onPress={handleLogout}>
        Logout
      </Button>
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
    backgroundColor : '#121212'
  },
});
