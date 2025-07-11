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
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },

    // Header Section
    headerSection: {
      alignItems: 'center',
      marginBottom: 32,
      paddingTop: 20,
    },
    headerIconContainer: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: isDark ? '#1A1A1A' : '#F8F8F8',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#E5E5E5',
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#000000',
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: 15,
      color: isDark ? '#999999' : '#666666',
      textAlign: 'center',
      lineHeight: 20,
      maxWidth: 280,
    },

    // Form Container
    formContainer: {
      flex: 1,
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
    },

    // Input Group
    inputGroup: {
      marginBottom: 24,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#000000',
      marginBottom: 8,
      marginLeft: 4,
      letterSpacing: -0.1,
    },

    // Input Container
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#0A0A0A' : '#FAFAFA',
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: isDark ? '#222222' : '#E8E8E8',
      paddingHorizontal: 16,
      paddingVertical: 4,
      minHeight: 56,
      position: 'relative',
    },
    inputContainerFocused: {
      borderColor: isDark ? '#FFFFFF' : '#000000',
      backgroundColor: isDark ? '#111111' : '#F5F5F5',
      shadowColor: isDark ? '#FFFFFF' : '#000000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    inputContainerError: {
      borderColor: '#FF4444',
      backgroundColor: isDark ? '#1A0A0A' : '#FFF8F8',
    },
    inputIconContainer: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
      paddingVertical: 12,
      paddingHorizontal: 0,
      letterSpacing: -0.2,
    },
    eyeIconContainer: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      marginLeft: 8,
    },

    // Error Styling
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      marginLeft: 4,
    },
    errorText: {
      fontSize: 12,
      color: '#FF4444',
      marginLeft: 4,
      fontWeight: '500',
    },

    // Dropdown Styling
    dropdown: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 0,
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    dropdownPlaceholder: {
      fontSize: 16,
      color: isDark ? '#666666' : '#999999',
      letterSpacing: -0.2,
    },
    dropdownSelectedText: {
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
      letterSpacing: -0.2,
    },
    dropdownSearch: {
      height: 40,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
      backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
      borderRadius: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#E0E0E0',
    },
    dropdownIcon: {
      width: 20,
      height: 20,
      tintColor: isDark ? '#666666' : '#999999',
    },
    dropdownContainer: {
      backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#E0E0E0',
      marginTop: 4,
      shadowColor: isDark ? '#FFFFFF' : '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    dropdownItemText: {
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
      paddingVertical: 2,
    },

    // Button Container
    buttonContainer: {
      marginTop: 32,
      marginBottom: 20,
    },
    submitButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#FFFFFF' : '#000000',
      paddingVertical: 18,
      paddingHorizontal: 24,
      borderRadius: 16,
      minHeight: 56,
      shadowColor: isDark ? '#FFFFFF' : '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    submitButtonPressed: {
      opacity: 0.9,
      transform: [{scale: 0.98}],
      shadowOpacity: 0.05,
    },
    submitButtonText: {
      color: isDark ? '#000000' : '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 8,
      letterSpacing: -0.2,
    },
  });
};
