import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import {FAB, Modal, Portal, TextInput} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PasswordContext from '../PasswordContext/PasswordContext';
import Snackbar from 'react-native-snackbar';
import PasswordListSearchBar from './Components/PasswordListSearchBar';
import {ThemeContext} from '../../Theme/ThemeProvider';
import {getStyles} from './styles';

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
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState(passwords);

  const isDark = theme === 'dark';
  const styles = getStyles(theme);

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
    setModalPasswordVisible(false);
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
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      textColor: isDark ? '#ffffff' : '#000000',
      action: {
        text: 'Close',
        textColor: isDark ? '#cccccc' : '#666666',
        onPress: Snackbar.dismiss,
      },
    });
  };

  const copyPassword = itemPassword => {
    Clipboard.setString(itemPassword);
    Snackbar.show({
      text: 'Password copied to clipboard',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      textColor: isDark ? '#ffffff' : '#000000',
      action: {
        text: 'Close',
        textColor: isDark ? '#cccccc' : '#666666',
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
    <View style={styles.listItem}>
      <View style={styles.itemHeader}>
        <View style={styles.iconContainer}>
          <Icon name="lock" size={20} color={isDark ? '#ffffff' : '#000000'} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => togglePasswordVisibility(item.id)}
            style={styles.actionButton}>
            <Icon
              name={passwordVisible[item.id] ? 'visibility' : 'visibility-off'}
              size={20}
              color={isDark ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEdit(item.id)}
            style={styles.actionButton}>
            <Icon
              name="edit"
              size={20}
              color={isDark ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.actionButton}>
            <Icon name="delete" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.credentialRow}>
        <View style={styles.credentialItem}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.credentialText}>{item.username}</Text>
        </View>
        <TouchableOpacity
          onPress={() => copyUsername(item.username)}
          style={styles.copyButton}>
          <Icon
            name="content-copy"
            size={18}
            color={isDark ? '#cccccc' : '#666666'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.credentialRow}>
        <View style={styles.credentialItem}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.credentialText}>
            {passwordVisible[item.id] ? item.password : '••••••••'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => copyPassword(item.password)}
          style={styles.copyButton}>
          <Icon
            name="content-copy"
            size={18}
            color={isDark ? '#cccccc' : '#666666'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon
        name="security"
        size={80}
        color={isDark ? '#333333' : '#cccccc'}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No Passwords Yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to add your first password
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Credentials Manager</Text>
          <Text style={styles.headerSubtitle}>
            {filteredPasswords.length} password
            {filteredPasswords.length !== 1 ? 's' : ''}
          </Text>
        </View>

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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? '#ffffff' : '#000000'}
              colors={[isDark ? '#ffffff' : '#000000']}
            />
          }
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={
            filteredPasswords.length === 0 ? styles.emptyContainer : null
          }
          showsVerticalScrollIndicator={false}
        />

        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddPassword')}
          color={isDark ? '#000000' : '#ffffff'}
        />

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => {
              setModalVisible(false);
              setModalPasswordVisible(false);
            }}
            contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Credentials</Text>
            </View>

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
                <View style={styles.modalForm}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Domain"
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      style={styles.input}
                      mode="outlined"
                      outlineColor={isDark ? '#333333' : '#e0e0e0'}
                      activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                      textColor={isDark ? '#ffffff' : '#000000'}
                      theme={{
                        colors: {
                          onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                          background: 'transparent',
                        },
                      }}
                    />
                    {touched.title && errors.title && (
                      <Text style={styles.errorText}>{errors.title}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Username"
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      style={styles.input}
                      mode="outlined"
                      outlineColor={isDark ? '#333333' : '#e0e0e0'}
                      activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                      textColor={isDark ? '#ffffff' : '#000000'}
                      theme={{
                        colors: {
                          onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                          background: 'transparent',
                        },
                      }}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        label="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry={!modalPasswordVisible}
                        style={[styles.input, styles.passwordInput]}
                        mode="outlined"
                        outlineColor={isDark ? '#333333' : '#e0e0e0'}
                        activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                        textColor={isDark ? '#ffffff' : '#000000'}
                        theme={{
                          colors: {
                            onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                            background: 'transparent',
                          },
                        }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setModalPasswordVisible(!modalPasswordVisible)
                        }
                        style={styles.passwordToggle}>
                        <Icon
                          name={
                            modalPasswordVisible
                              ? 'visibility'
                              : 'visibility-off'
                          }
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.modalButtons}>
                    <Pressable
                      onPress={() => {
                        setModalVisible(false);
                        setModalPasswordVisible(false);
                      }}
                      style={[styles.modalButton, styles.cancelButton]}
                      android_ripple={{
                        color: isDark ? '#333333' : '#f0f0f0',
                        borderless: false,
                      }}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>

                    <Pressable
                      onPress={handleSubmit}
                      style={[styles.modalButton, styles.saveButton]}
                      android_ripple={{
                        color: isDark ? '#333333' : '#f0f0f0',
                        borderless: false,
                      }}>
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </Modal>
        </Portal>
      </View>
    </>
  );
};

export default PasswordListScreen;
