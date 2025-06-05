import {StyleSheet} from 'react-native';

export const createStyles = isDark =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoIcon: {
      marginBottom: 20,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      borderRadius: 12,
      backgroundColor: isDark ? '#111111' : '#f8f8f8',
      paddingHorizontal: 15,
      height: 55,
    },
    inputWrapperFocused: {
      borderColor: isDark ? '#ffffff' : '#000000',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },
    inputIcon: {
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
    },
    eyeIcon: {
      padding: 5,
    },
    passwordStrength: {
      marginTop: 8,
      marginLeft: 4,
    },
    passwordStrengthText: {
      fontSize: 12,
      color: isDark ? '#cccccc' : '#666666',
    },
    signupButton: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      borderRadius: 12,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: isDark ? '#ffffff' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    signupButtonText: {
      color: isDark ? '#000000' : '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
    termsContainer: {
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    termsText: {
      fontSize: 12,
      color: isDark ? '#999999' : '#666666',
      textAlign: 'center',
      lineHeight: 18,
    },
    termsLink: {
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '600',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#333333' : '#e0e0e0',
    },
    dividerText: {
      marginHorizontal: 16,
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 14,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 16,
    },
    loginLink: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 5,
    },
  });
