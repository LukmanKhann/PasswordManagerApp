import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  List,
  FAB,
  IconButton,
  Modal,
  Portal,
  TextInput,
  Button,
} from 'react-native-paper';
import PasswordContext from '../screens/PasswordContext';

const PasswordListScreen = ({navigation}) => {
  const {passwords, editPassword, deletePassword} = useContext(PasswordContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEdit = id => {
    const passwordToEdit = passwords.find(item => item.id === id);
    if (passwordToEdit) {
      setEditId(id);
      setTitle(passwordToEdit.title);
      setUsername(passwordToEdit.username);
      setPassword(passwordToEdit.password);
      setModalVisible(true);
    }
  };

  const handleDelete = id => {
    Alert.alert(
      'Delete Password',
      'Are you sure you want to delete this password?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePassword(id);
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handleSaveChanges = () => {
    editPassword(editId, title, username, password);
    setModalVisible(false);
  };

  const renderItem = ({item}) => (
    <List.Item
      title={item.title}
      description={`Username: ${item.username}\nPassword: ${item.password}`}
      left={() => <List.Icon icon="lock-outline" />}
      right={() => (
        <View style={styles.actionIcons}>
          <IconButton
            icon="pencil"
            size={20}
            color="#6200ea"
            onPress={() => handleEdit(item.id)}
          />
          <IconButton
            icon="delete"
            size={20}
            color="#e91e63"
            onPress={() => handleDelete(item.id)}
          />
        </View>
      )}
      onPress={() => {}}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={passwords}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddPassword')}
        color="#ffffff"
      />

      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
            />
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={[styles.input, {flex: 1}]}
                theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}>
                <IconButton
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6200ea"
                />
              </TouchableOpacity>
            </View>
            <Button
              mode="contained"
              onPress={handleSaveChanges}
              style={styles.button}>
              Save Changes
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default PasswordListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#121212',
  },
  rightActions: {
    flexDirection: 'row',
  },
  listItem: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 24,
    paddingVertical: 7,
    width: '70%',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    alignSelf: 'center',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
