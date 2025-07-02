import {useContext} from 'react';
import {Alert} from 'react-native';
import {ThemeContext} from '../../../Theme/ThemeProvider';
import {AuthContext} from '../../../Auth/AuthContext';

export const useAppSettings = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {signOut, user} = useContext(AuthContext);

  const isDark = theme === 'dark';

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  };

  const handleBackupSync = () => {
    Alert.alert('Coming Soon', 'This feature will be available soon');
  };

  const handleExportData = () => {
    Alert.alert('Coming Soon', 'This feature will be available soon');
  };

  const handleImportData = () => {
    Alert.alert('Coming Soon', 'This feature will be available soon');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help', 'Contact us at support@securevault.com');
  };

  const handleAbout = () => {
    Alert.alert(
      'About SecureVault',
      'Version 1.0.0\nBuilt with security in mind',
    );
  };

  const handleRateApp = () => {
    Alert.alert('Rate Us', 'Thank you for using SecureVault!');
  };

  return {
    // Theme
    theme,
    isDark,
    toggleTheme,

    // User
    user,

    // Actions
    handleLogout,
    handleBackupSync,
    handleExportData,
    handleImportData,
    handleHelpSupport,
    handleAbout,
    handleRateApp,
  };
};
