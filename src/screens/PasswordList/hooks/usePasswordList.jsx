import {useState, useContext, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import PasswordContext from '../../../context/PasswordContext/PasswordContext';
import {ThemeContext} from '../../../Theme/ThemeProvider';
import {getStyles} from '../styles';

export const usePasswordList = () => {
  const {passwords, editPassword, deletePassword, loadPasswords} =
    useContext(PasswordContext);
  const {theme} = useContext(ThemeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState(passwords);
  const [loading, setLoading] = useState(false);

  const isDark = theme === 'dark';
  const styles = getStyles(theme);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = passwords.filter(
        item =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPasswords(filtered);
    } else {
      setFilteredPasswords(passwords);
    }
  }, [passwords, searchQuery]);

  const showSnackbar = useCallback(
    (message, type = 'info') => {
      const backgroundColor =
        type === 'error'
          ? '#ff4444'
          : type === 'success'
          ? '#4CAF50'
          : isDark
          ? '#333333'
          : '#f0f0f0';

      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor,
        textColor: '#ffffff',
        action: {
          text: 'Close',
          textColor: '#cccccc',
          onPress: Snackbar.dismiss,
        },
      });
    },
    [isDark],
  );

  const handleEdit = useCallback(
    id => {
      const passwordToEdit = passwords.find(item => item.id === id);
      if (passwordToEdit) {
        setEditId(id);
        setTitle(passwordToEdit.title || '');
        setUsername(passwordToEdit.username || '');
        setPassword(passwordToEdit.password || '');
        setCategory(passwordToEdit.category || 'others');
        setModalVisible(true);
      }
    },
    [passwords],
  );

  const handleDelete = useCallback(
    id => {
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
            onPress: async () => {
              try {
                setLoading(true);
                await deletePassword(id);
                showSnackbar('Password deleted successfully', 'success');
              } catch (error) {
                console.error('Delete error:', error);
                showSnackbar('Failed to delete password', 'error');
              } finally {
                setLoading(false);
              }
            },
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    },
    [deletePassword, showSnackbar],
  );

  const handleSaveChanges = useCallback(
    async values => {
      try {
        setLoading(true);
        await editPassword(
          editId,
          values.title,
          values.username,
          values.password,
          values.category,
        );
        setModalVisible(false);
        setModalPasswordVisible(false);
        showSnackbar('Password updated successfully', 'success');

        // Clear form states
        setEditId('');
        setTitle('');
        setUsername('');
        setPassword('');
        setCategory('');
      } catch (error) {
        console.error('Save error:', error);
        showSnackbar('Failed to update password', 'error');
      } finally {
        setLoading(false);
      }
    },
    [editId, editPassword, showSnackbar],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadPasswords();
    } catch (error) {
      console.error('Refresh error:', error);
      showSnackbar('Failed to refresh passwords', 'error');
    } finally {
      setRefreshing(false);
    }
  }, [loadPasswords, showSnackbar]);

  const copyUsername = useCallback(
    itemUsername => {
      if (!itemUsername) {
        showSnackbar('No username to copy', 'error');
        return;
      }

      Clipboard.setString(itemUsername);
      showSnackbar('Username copied to clipboard', 'success');
    },
    [showSnackbar],
  );

  const copyPassword = useCallback(
    itemPassword => {
      if (!itemPassword) {
        showSnackbar('No password to copy', 'error');
        return;
      }

      Clipboard.setString(itemPassword);
      showSnackbar('Password copied to clipboard', 'success');
    },
    [showSnackbar],
  );

  const togglePasswordVisibility = useCallback(id => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

  const handleSearch = useCallback(query => {
    setSearchQuery(query);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalPasswordVisible(false);
    setEditId('');
    setTitle('');
    setUsername('');
    setPassword('');
    setCategory('');
  }, []);

  return {
    // Data and state
    filteredPasswords,
    loading,
    refreshing,
    searchQuery,
    modalVisible,
    modalPasswordVisible,
    passwordVisible,
    editId,
    title,
    username,
    password,
    category,
    isDark,
    styles,

    // Handlers
    handleEdit,
    handleDelete,
    handleSaveChanges,
    onRefresh,
    handleSearch,
    closeModal,
    togglePasswordVisibility,
    copyUsername,
    copyPassword,
    setModalPasswordVisible,
    showSnackbar,
  };
};
