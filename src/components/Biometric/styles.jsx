import {StyleSheet} from 'react-native';

export const createStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
      marginBottom: 20,
    },
    profileIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      marginLeft: 20,
      marginBottom: 10,
      marginTop: 20,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#f0f0f0',
      backgroundColor: isDark ? '#000000' : '#ffffff',
      minHeight: 70,
    },
    settingItemDisabled: {
      opacity: 0.5,
    },
    settingItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#333333' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 2,
    },
    settingTitleDisabled: {
      color: isDark ? '#666666' : '#999999',
    },
    settingSubtitle: {
      fontSize: 14,
      color: isDark ? '#cccccc' : '#666666',
      lineHeight: 18,
    },
    settingSubtitleDisabled: {
      color: isDark ? '#444444' : '#cccccc',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff4444',
      marginHorizontal: 20,
      marginTop: 30,
      paddingVertical: 16,
      borderRadius: 12,
    },
    logoutButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
      marginLeft: 8,
    },
    versionContainer: {
      alignItems: 'center',
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    versionText: {
      fontSize: 14,
      color: isDark ? '#666666' : '#999999',
      textAlign: 'center',
    },
    
    // Authentication specific styles
    authContainer: {
      padding: 20,
      backgroundColor: isDark ? '#111111' : '#f9f9f9',
      borderRadius: 12,
      margin: 20,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    authTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 15,
    },
    authRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
    },
    authRowLast: {
      borderBottomWidth: 0,
    },
    authLabel: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      flex: 1,
    },
    authStatus: {
      fontSize: 14,
      color: isDark ? '#cccccc' : '#666666',
      marginRight: 10,
    },
    authStatusEnabled: {
      color: '#4CAF50',
    },
    authStatusDisabled: {
      color: '#ff4444',
    },
    
    // Security indicator styles
    securityIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: isDark ? '#1a3d1a' : '#e8f5e8',
      borderRadius: 8,
      margin: 20,
      borderLeftWidth: 4,
      borderLeftColor: '#4CAF50',
    },
    securityIndicatorWeak: {
      backgroundColor: isDark ? '#3d1a1a' : '#ffe8e8',
      borderLeftColor: '#ff4444',
    },
    securityIndicatorMedium: {
      backgroundColor: isDark ? '#3d3d1a' : '#fff8e8',
      borderLeftColor: '#ff9800',
    },
    securityText: {
      fontSize: 14,
      color: isDark ? '#ffffff' : '#000000',
      marginLeft: 10,
      flex: 1,
    },
    
    // Switch customization
    switchTrack: {
      false: isDark ? '#444444' : '#cccccc',
      true: isDark ? '#ffffff' : '#000000',
    },
    switchThumb: {
      false: isDark ? '#666666' : '#999999',
      true: isDark ? '#000000' : '#ffffff',
    },
  });