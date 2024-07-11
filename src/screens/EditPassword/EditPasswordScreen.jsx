import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import PasswordContext from './PasswordContext/PasswordContext';
import {ThemeContext} from '../../Theme/ThemeProvider';

const EditPasswordScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {passwords, editPassword} = useContext(PasswordContext);
  const {theme} = useContext(ThemeContext);

  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const passwordToEdit = passwords.find(item => item.id === id);
    if (passwordToEdit) {
      setTitle(passwordToEdit.title);
      setUsername(passwordToEdit.username);
      setPassword(passwordToEdit.password);
    }
  }, [id, passwords]);

  const handleSave = () => {
    editPassword(id, title, username, password);
    navigation.navigate('Passwords');
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        theme={{
          colors: {
            primary: theme === 'dark' ? '#ffffff' : '#121212',
            background: theme === 'dark' ? '#121212' : '#F3F4F9',
          },
        }}
      />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        theme={{
          colors: {
            primary: theme === 'dark' ? '#ffffff' : '#121212',
            background: theme === 'dark' ? '#121212' : '#F3F4F9',
          },
        }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{
          colors: {
            primary: theme === 'dark' ? '#ffffff' : '#121212',
            background: theme === 'dark' ? '#121212' : '#F3F4F9',
          },
        }}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
    </View>
  );
};

export default EditPasswordScreen;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
    },
    input: {
      marginBottom: 16,
      backgroundColor: theme === 'dark' ? '#121212' : '#F3F4F9',
    },
    button: {
      marginTop: 16,
      backgroundColor: theme === 'dark' ? '#ffffff' : '#121212',
      color: theme === 'dark' ? '#121212' : '#ffffff',
    },
  });
