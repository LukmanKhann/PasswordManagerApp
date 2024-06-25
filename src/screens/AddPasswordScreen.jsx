import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, Title} from 'react-native-paper';
import PasswordContext from '../screens/PasswordContext';

export default function AddPasswordScreen({navigation}) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {addPassword} = useContext(PasswordContext);

  const handleSave = () => {
    addPassword(title, username, password);
    navigation.navigate('Passwords');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title style={styles.title}>Add New Password</Title>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
          theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
        />
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
          theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
        />
        <Pressable mode="contained" onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save Password</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    alignSelf: 'center',
    color: '#370100',
    fontWeight: '500',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#F3F4F9',
    borderRadius: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
