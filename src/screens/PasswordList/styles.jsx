import {StyleSheet} from 'react-native';

export const getStyles = theme => {
  const isDark = theme === 'dark';
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    header: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? '#cccccc' : '#666666',
      fontWeight: '400',
    },
    listItem: {
      backgroundColor: isDark ? '#111111' : '#f8f8f8',
      marginHorizontal: 16,
      marginVertical: 6,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      padding: 8,
      marginLeft: 4,
    },
    credentialRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#333333' : '#e0e0e0',
      marginTop: 8,
    },
    credentialItem: {
      flex: 1,
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: isDark ? '#cccccc' : '#666666',
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    credentialText: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'monospace',
    },
    copyButton: {
      padding: 8,
      marginLeft: 12,
    },
    emptyContainer: {
      flex: 1,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
      lineHeight: 22,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: isDark ? '#ffffff' : '#000000',
    },
    modalContent: {
      backgroundColor: isDark ? '#111111' : '#ffffff',
      margin: 20,
      borderRadius: 16,
      maxHeight: '80%',
    },
    modalHeader: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#000000',
      textAlign: 'center',
    },
    modalForm: {
      padding: 24,
    },
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      backgroundColor: 'transparent',
      fontSize: 16,
    },
    passwordInputContainer: {
      position: 'relative',
    },
    passwordInput: {
      paddingRight: 50,
    },
    passwordToggle: {
      position: 'absolute',
      right: 12,
      top: 18,
      padding: 8,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
      gap: 16,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: isDark ? '#ffffff' : '#000000',
    },
    saveButton: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#000000' : '#ffffff',
    },
    errorText: {
      fontSize: 12,
      color: '#ff4444',
      marginTop: 4,
      marginLeft: 12,
      fontWeight: '500',
    },
  });
};