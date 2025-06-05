import {StyleSheet} from 'react-native';

export const getStyles = theme => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#1a1a1a' : '#f0f0f0',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
    },
    viewToggle: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
      borderRadius: 20,
      padding: 4,
    },
    viewToggleBtn: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    viewToggleBtnActive: {
      backgroundColor: isDark ? '#333333' : '#ffffff',
    },
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    statsText: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      marginRight: 16,
    },
    favoriteToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    favoriteToggleText: {
      marginLeft: 6,
      fontSize: 14,
    },
    categoriesContainer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    categoriesScroll: {
      flexDirection: 'row',
    },
    categoryChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryChipActive: {
      backgroundColor: '#ff4757',
    },
    categoryIcon: {
      marginRight: 6,
    },
    categoryText: {
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 14,
      fontWeight: '500',
    },
    categoryTextActive: {
      color: '#ffffff',
    },
    categoryCount: {
      fontSize: 12,
      marginLeft: 4,
      opacity: 0.7,
    },
    passwordCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#f0f0f0',
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    cardIconContainer: {
      marginRight: 12,
    },
    domainIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    domainIconText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardContent: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      flex: 1,
    },
    favoriteButton: {
      padding: 4,
    },
    cardUsername: {
      fontSize: 14,
      marginBottom: 8,
    },
    cardLabels: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelChip: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    labelText: {
      fontSize: 12,
      fontWeight: '500',
    },
    lastUpdated: {
      fontSize: 12,
    },
    cardActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#333333' : '#f0f0f0',
    },
    actionBtn: {
      padding: 8,
      borderRadius: 8,
    },
    deleteBtn: {
      backgroundColor: isDark ? '#2a1a1a' : '#fff5f5',
    },
    passwordReveal: {
      marginTop: 12,
      padding: 12,
      backgroundColor: isDark ? '#2a2a2a' : '#f8f8f8',
      borderRadius: 8,
    },
    revealedPassword: {
      fontSize: 16,
      fontFamily: 'monospace',
      textAlign: 'center',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyIconContainer: {
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
      backgroundColor: '#ff4757',
    },
    modalContent: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      padding: 0,
      margin: 20,
      borderRadius: 16,
      maxHeight: '80%',
    },
    modalHeader: {
      padding: 24,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#f0f0f0',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      textAlign: 'center',
    },
    modalForm: {
      padding: 24,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      backgroundColor: 'transparent',
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
      top: 16,
      padding: 8,
    },
    errorText: {
      color: '#ff4757',
      fontSize: 12,
      marginTop: 4,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
      marginRight: 8,
    },
    saveButton: {
      backgroundColor: '#ff4757',
      marginLeft: 8,
    },
    disabledButton: {
      opacity: 0.6,
    },
    cancelButtonText: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
    },
    saveButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
};
