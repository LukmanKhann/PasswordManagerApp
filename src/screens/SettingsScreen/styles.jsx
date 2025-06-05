import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const createStyles = isDark =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    header: {
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
    },
    profileIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDark ? '#333333' : '#e8e8e8',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
    },
    sectionHeader: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 32,
      marginBottom: 12,
      marginHorizontal: 20,
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: isDark ? '#cccccc' : '#666666',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginHorizontal: 16,
      marginBottom: 8,
      borderRadius: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
    },
    settingItemLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: isDark ? '#333333' : '#e8e8e8',
    },
    textContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 2,
      color: isDark ? '#ffffff' : '#000000',
    },
    settingSubtitle: {
      fontSize: 14,
      color: isDark ? '#cccccc' : '#666666',
    },
    settingItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutButton: {
      backgroundColor: '#ff3b30',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 12,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoutButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 8,
    },
    versionContainer: {
      alignItems: 'center',
      marginTop: 30,
      paddingHorizontal: 20,
    },
    versionText: {
      fontSize: 14,
      color: isDark ? '#666666' : '#999999',
    },
  });
