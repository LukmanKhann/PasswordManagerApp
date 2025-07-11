import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

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
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#000000',
    },
    viewToggle: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
      borderRadius: 12,
      padding: 2,
    },
    viewToggleBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      minWidth: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewToggleBtnActive: {
      backgroundColor: isDark ? '#333333' : '#ffffff',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
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
      fontWeight: '500',
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
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#e2e8f0',
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
      fontWeight: '600',
    },
    categoryTextActive: {
      color: '#ffffff',
    },
    categoryCount: {
      fontSize: 12,
      marginLeft: 4,
      opacity: 0.8,
    },

    // Grid View Styles
    gridRow: {
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    passwordCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      borderRadius: 16,
      width: cardWidth,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#f0f0f0',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    domainIcon: {
      height: 40,
      borderRadius: 12,
      marginBottom: 14,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    domainIconText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },
    favoriteButton: {
      padding: 4,
      borderRadius: 20,
    },
    cardContent: {
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      lineHeight: 20,
    },
    cardUsername: {
      fontSize: 14,
      marginBottom: 8,
      lineHeight: 18,
    },
    cardLabels: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelChip: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    labelText: {
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    actionBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryAction: {
      backgroundColor: '#6366f1',
    },
    lastUpdated: {
      fontSize: 11,
      textAlign: 'center',
      fontWeight: '500',
    },
    passwordReveal: {
      marginTop: 12,
      padding: 12,
      backgroundColor: isDark ? '#2a2a2a' : '#f8f8f8',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#e2e8f0',
    },
    revealedPassword: {
      fontSize: 14,
      fontFamily: 'monospace',
      textAlign: 'center',
      lineHeight: 20,
    },

    // List View Styles
    passwordListItem: {
      backgroundColor: isDark ? '#000000' : '#ffffff',
      borderRadius: 12,
      marginHorizontal: 20,
      marginBottom: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#e2e8f0',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: isDark ? 0.2 : 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    listItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    listDomainIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    listDomainIconText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '700',
    },
    listItemContent: {
      flex: 1,
      marginRight: 16,
    },
    listTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    listTitle: {
      fontSize: 17,
      fontWeight: '600',
      flex: 1,
      lineHeight: 22,
    },
    listFavoriteIcon: {
      marginLeft: 8,
    },
    listUsername: {
      fontSize: 15,
      marginBottom: 6,
      lineHeight: 20,
    },
    listMetadata: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listLabelChip: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    listLabelText: {
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    listLastUpdated: {
      fontSize: 12,
      fontWeight: '500',
    },
    listItemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 12,
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#374151' : '#f1f5f9',
    },
    listActionBtn: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#2c2c2e' : '#f4f4f5',
    },
    primaryListAction: {
      backgroundColor: '#6366f1',
    },
    listPasswordReveal: {
      marginTop: 12,
      padding: 12,
      backgroundColor: isDark ? '#2c2c2e' : '#f4f4f5',
      borderRadius: 22,
      borderWidth: 0.1,
    },
    listRevealedPassword: {
      fontSize: 15,
      fontFamily: 'monospace',
      textAlign: 'center',
      lineHeight: 22,
    },

    // Empty State
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyIconContainer: {
      marginBottom: 24,
      padding: 20,
      borderRadius: 20,
      backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      fontWeight: '500',
    },

    // FAB
    fab: {
      position: 'absolute',
      backgroundColor: isDark ? '#ffffff' : '#000000',
      margin: 20,
      right: 0,
      bottom: 0,
      borderRadius: 16,
    },

    // Modal Styles
    modalContent: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      padding: 0,
      margin: 20,
      borderRadius: 20,
      maxHeight: '80%',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    modalHeader: {
      padding: 24,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#f0f0f0',
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
      color: '#ef4444',
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
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
    gridActionButtons: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 6, // Reduced gap for better fit
    },
    gridActionBtn: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondaryAction: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
    },
    deleteAction: {
      backgroundColor: isDark ? '#1f2937' : '#fef2f2',
    },
    deleteListAction: {
      backgroundColor: isDark ? '#1f2937' : '#fef2f2',
    },
    cardContentInHeader: {
      flex: 1,
      marginLeft: 12, // Space between domain icon and content
      marginRight: 8, // Space between content and action buttons
      justifyContent: 'center',
    },

    inputLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      marginLeft: 4,
    },
    dropdownContainer: {
      position: 'relative',
      marginBottom: 8,
    },
    dropdownIcon: {
      position: 'absolute',
      left: 12,
      top: 16,
      zIndex: 1,
    },
    dropdown: {
      height: 50,
      paddingHorizontal: 40,
      paddingVertical: 8,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      borderRadius: 4,
      paddingHorizontal: 12,
    },
    iconStyle: {
      width: 20,
      height: 20,
      marginRight: 12,
    },
    headerSubtitle: {
      fontSize: 13,
      color: isDark ? '#aaaaaa' : '#888888',
      marginTop: 4,
      lineHeight: 17,
      letterSpacing: 0.3,
    },
  });
};
