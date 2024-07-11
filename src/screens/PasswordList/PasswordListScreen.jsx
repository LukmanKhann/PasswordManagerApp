import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Text,
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
import Clipboard from '@react-native-clipboard/clipboard';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PasswordContext from '../PasswordContext/PasswordContext';
import Snackbar from 'react-native-snackbar';
import PasswordListSearchBar from './Components/PasswordListSearchBar';
import {ThemeContext} from '../../Theme/ThemeProvider';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Domain is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const PasswordListScreen = ({navigation}) => {
  const {passwords, editPassword, deletePassword, loadPasswords} =
    useContext(PasswordContext);
  const {theme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState(passwords);

  useEffect(() => {
    setFilteredPasswords(passwords);
  }, [passwords]);

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

  const handleSaveChanges = async values => {
    await editPassword(editId, values.title, values.username, values.password);
    setModalVisible(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPasswords();
    setRefreshing(false);
  };

  const copyUsername = itemUsername => {
    Clipboard.setString(itemUsername);
    Snackbar.show({
      text: 'Username copied to clipboard',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
      action: {
        text: 'Close',
        textColor: '#b2b2b2',
        onPress: Snackbar.dismiss,
      },
    });
  };

  const copyPassword = itemPassword => {
    Clipboard.setString(itemPassword);
    Snackbar.show({
      text: 'Password copied to clipboard',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
      action: {
        text: 'Close',
        textColor: '#b2b2b2',
        onPress: Snackbar.dismiss,
      },
    });
  };

  const togglePasswordVisibility = id => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filtered = passwords.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.username.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredPasswords(filtered);
    } else {
      setFilteredPasswords(passwords);
    }
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.listItem,
        {backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'},
      ]}>
      <View style={styles.itemContent}>
        <List.Icon
          icon="lock-outline"
          color={theme === 'dark' ? '#ffffff' : '#000000'}
        />
        <View style={styles.textContent}>
          <Text
            selectable
            style={[
              styles.title,
              {color: theme === 'dark' ? '#ffffff' : '#000000'},
            ]}>
            {item.title}
          </Text>
          <View style={styles.usernameRow}>
            <Text style={styles.boldText}>Username: </Text>
            <Text
              selectable={{color: theme === 'dark' ? '#ffffff' : '#000000'}}>
              {item.username}
            </Text>
            <TouchableOpacity onPress={() => copyUsername(item.username)}>
              <IconButton icon="content-copy" size={17} color="#6200ea" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordRow}>
            <Text style={styles.boldText}>Password: </Text>
            <Text
              selectable={{color: theme === 'dark' ? '#ffffff' : '#000000'}}>
              {passwordVisible[item.id] ? item.password : '********'}
            </Text>
            <TouchableOpacity onPress={() => copyPassword(item.password)}>
              <IconButton icon="content-copy" size={17} color="#6200ea" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.actionIcons}>
        <TouchableOpacity onPress={() => togglePasswordVisibility(item.id)}>
          <IconButton
            icon={passwordVisible[item.id] ? 'eye-off' : 'eye'}
            size={18}
            color="#6200ea"
          />
        </TouchableOpacity>
        <IconButton
          icon="pencil"
          size={18}
          color="#6200ea"
          onPress={() => handleEdit(item.id)}
        />
        <IconButton
          icon="delete"
          size={18}
          color="#e91e63"
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5'},
      ]}>
      <PasswordListSearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        theme={theme}
      />
      <FlatList
        data={filteredPasswords}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddPassword')}
        color="#ffffff"
      />
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={[
            styles.modalContent,
            {backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'},
          ]}>
          <Formik
            enableReinitialize
            initialValues={{title, username, password}}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  label="Domain"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  style={styles.input}
                  theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
                />
                {touched.title && errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}

                <TextInput
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  style={styles.input}
                  theme={{colors: {primary: '#121212', background: '#F3F4F9'}}}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!passwordVisible}
                    style={[styles.input, {flex: 1}]}
                    theme={{
                      colors: {primary: '#121212', background: '#F3F4F9'},
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.visibilityIcon}>
                    <IconButton
                      icon={passwordVisible ? 'eye' : 'eye-off'}
                      size={20}
                      color="#6200ea"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.saveButton}
                  labelStyle={styles.saveButtonText}>
                  Save Changes
                </Button>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContent: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  boldText: {
    fontWeight: 'bold',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#F3F4F9',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  visibilityIcon: {
    position: 'absolute',
    right: 10,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#6200ee',
  },
  saveButtonText: {
    color: '#ffffff',
  },
});

export default PasswordListScreen;
