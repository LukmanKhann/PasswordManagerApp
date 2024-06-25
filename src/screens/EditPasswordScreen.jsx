import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import PasswordContext from '../screens/PasswordContext';

const EditPasswordScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {passwords, editPassword} = useContext(PasswordContext);

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

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
    </View>
  );
};

export default EditPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
