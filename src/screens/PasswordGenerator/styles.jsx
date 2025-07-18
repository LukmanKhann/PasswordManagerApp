import {StyleSheet} from 'react-native';

export const getStyles = isDark =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#000000',
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#888888' : '#666666',
      marginTop: 4,
    },
    themeToggle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    formContainer: {
      paddingHorizontal: 24,
    },
    inputSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      borderRadius: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      paddingHorizontal: 16,
      height: 56,
    },
    inputIcon: {
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '500',
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    errorText: {
      fontSize: 14,
      color: '#ff4444',
      marginLeft: 6,
      fontWeight: '500',
    },
    optionsSection: {
      marginBottom: 32,
    },
    optionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      minHeight: 60,
    },
    optionLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    optionText: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      marginLeft: 12,
      fontWeight: '500',
    },
    checkboxContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtons: {
      gap: 16,
      marginBottom: 32,
    },
    primaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#ffffff' : '#000000',
      paddingVertical: 16,
      borderRadius: 12,
      gap: 8,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#000000' : '#ffffff',
      letterSpacing: -0.2,
    },
    disabledButton: {
      backgroundColor: isDark ? '#333333' : '#e0e0e0',
    },
    disabledButtonText: {
      color: '#666666',
    },
    secondaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isDark ? '#ffffff' : '#000000',
      gap: 8,
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      letterSpacing: -0.2,
    },
    passwordCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    passwordTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
    },
    strengthBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    strengthText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#ffffff',
      textTransform: 'uppercase',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#000000' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      marginBottom: 16,
    },
    passwordText: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'monospace',
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    copyButton: {
      marginLeft: 12,
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
    },
    passwordInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 14,
      color: isDark ? '#888888' : '#666666',
      marginLeft: 6,
      fontWeight: '500',
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },

    // Toggle button to switch between slider and text input
    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: isDark ? '#555555' : '#e0e0e0',
    },

    toggleButtonText: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 12,
      fontWeight: '500',
      marginLeft: 4,
    },

    // Slider container
    sliderContainer: {
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },

    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },

    sliderLabel: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
    },

    sliderRange: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    sliderRangeText: {
      color: isDark ? '#888888' : '#666666',
      fontSize: 12,
      marginHorizontal: 8,
    },

    slider: {
      width: '100%',
      height: 40,
    },

    sliderThumb: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      width: 20,
      height: 20,
      borderRadius: 10,
    },

    sliderTrack: {
      height: 4,
      borderRadius: 2,
    },
  });
