import {StyleSheet} from 'react-native';

export const getStyles = (theme) => {
  const isDark = theme === 'dark';
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#FFFFFF',
    },
    header: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      paddingTop: 50,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#1A1A1A' : '#F0F0F0',
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#1A1A1A' : '#F8F8F8',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#000000',
      letterSpacing: -0.5,
      alignSelf: 'center',
    },
    placeholder: {
      width: 44,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 32,
    },
    form: {
      flex: 1,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
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
      backgroundColor: isDark ? '#0A0A0A' : '#FAFAFA',
      fontSize: 16,
      paddingLeft: 48,
    },
    inputOutline: {
      borderColor: isDark ? '#2A2A2A' : '#E8E8E8',
      borderWidth: 1,
      borderRadius: 12,
    },
    inputContent: {
      color: isDark ? '#FFFFFF' : '#000000',
      paddingLeft: 48,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#FFFFFF' : '#000000',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginTop: 32,
      marginBottom: 24,
      shadowColor: isDark ? '#FFFFFF' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonPressed: {
      opacity: 0.8,
      transform: [{scale: 0.98}],
    },
    buttonIcon: {
      marginRight: 8,
    },
    buttonText: {
      color: isDark ? '#000000' : '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.3,
    },
    errorText: {
      fontSize: 12,
      color: '#FF4444',
      marginTop: 4,
      marginLeft: 4,
      fontWeight: '400',
    },
  });
};