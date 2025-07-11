import {StyleSheet} from 'react-native';

export const createStyles = isDark =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: isDark ? '#222' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#FF69B4',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 4,
      letterSpacing: 1.2,
    },
    tagline: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
      marginBottom: 8,
    },
    authContainer: {
      alignItems: 'center',
      width: '100%',
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 6,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
      marginBottom: 18,
    },
    helpContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    helpText: {
      fontSize: 14,
      color: isDark ? '#888888' : '#666666',
      textAlign: 'center',
      marginBottom: 2,
    },
    helpButton: {
      padding: 8,
    },
    helpButtonText: {
      fontSize: 14,
      color: isDark ? '#ff1744' : '#ff5252',
      fontWeight: '400',
      lineHeight: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: isDark ? '#cccccc' : '#333333',
    },
  });
