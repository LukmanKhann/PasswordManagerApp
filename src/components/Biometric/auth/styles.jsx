import {StyleSheet} from 'react-native';

export const createStyles = isDark =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 60,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
    },
    authContainer: {
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
      marginBottom: 40,
    },
    authButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#333333' : '#f5f5f5',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginBottom: 16,
      width: '100%',
      maxWidth: 300,
    },
    authButtonPrimary: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
    },
    authButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      marginLeft: 12,
    },
    authButtonTextPrimary: {
      color: isDark ? '#000000' : '#ffffff',
    },
    orText: {
      fontSize: 16,
      color: isDark ? '#888888' : '#666666',
      marginVertical: 20,
    },
    helpContainer: {
      position: 'absolute',
      bottom: 40,
      alignItems: 'center',
    },
    helpText: {
      fontSize: 14,
      color: isDark ? '#888888' : '#666666',
      textAlign: 'center',
      marginBottom: 8,
    },
    helpButton: {
      padding: 8,
    },
    helpButtonText: {
      fontSize: 14,
      color: isDark ? '#4da6ff' : '#0066cc',
      textDecorationLine: 'underline',
    },
  });
