import {StyleSheet} from 'react-native';

export const getStyles = theme => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#FFFFFF',
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    formContainer: {
      flex: 1,
      justifyContent: 'center',
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#000000',
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#888888' : '#666666',
      textAlign: 'center',
      marginBottom: 40,
      fontWeight: '400',
    },
    form: {
      backgroundColor: isDark ? '#0A0A0A' : '#FAFAFA',
      borderRadius: 16,
      padding: 24,
      shadowColor: isDark ? '#FFFFFF' : '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: isDark ? 0.05 : 0.08,
      shadowRadius: 12,
      elevation: 2,
      borderWidth: 1,
      borderColor: isDark ? '#1A1A1A' : '#F0F0F0',
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#000000',
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    inputContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputIcon: {
      position: 'absolute',
      left: 16,
      zIndex: 1,
    },
    input: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#FFFFFF',
      fontSize: 16,
      paddingLeft: 48,
      minHeight: 56,
    },
    inputOutline: {
      borderColor: isDark ? '#2A2A2A' : '#E0E0E0',
      borderWidth: 1.5,
      borderRadius: 12,
    },
    inputContent: {
      color: isDark ? '#FFFFFF' : '#000000',
      paddingLeft: 48,
    },
    passwordInputWrapper: {
      position: 'relative',
      flex: 1,
    },
    eyeIconContainer: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: [{translateY: -10}],
      zIndex: 1,
      borderRadius: 20,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#FFFFFF' : '#000000',
      paddingVertical: 18,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginTop: 24,
      minHeight: 56,
      shadowColor: isDark ? '#FFFFFF' : '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
    },
    buttonPressed: {
      opacity: 0.9,
      transform: [{scale: 0.98}],
    },
    buttonIcon: {
      marginRight: 8,
    },
    buttonText: {
      color: isDark ? '#000000' : '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: -0.3,
    },
    errorText: {
      fontSize: 12,
      color: '#FF4444',
      marginTop: 6,
      marginLeft: 4,
      fontWeight: '500',
    },
    dropdown: {
      fontSize: 16,
      paddingLeft: 48,
      minHeight: 56,
      color: isDark ? '#000000' : '#FFFFFF',
      borderWidth: 0.5,
      borderRadius: 12,
      paddingHorizontal: 8,
      backgroundColor: isDark ? '#000000' : '#FFFFFF',
      borderColor: isDark ? '#2A2A2A' : '#E0E0E0',
      borderWidth: 1.5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: isDark ? '#666666' : '#999999',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });
};
