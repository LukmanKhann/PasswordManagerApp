import React, {useState, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Text,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import {FAB, Modal, Portal, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PasswordListSearchBar from './Components/PasswordListSearchBar';
import {usePasswordList} from './hooks/usePasswordList';
import {validationSchema} from './utils/passwordListHelpers';
import PasswordItem from './Components/PasswordItem';

const PasswordListScreen = ({navigation}) => {
  const {
    // Data and state
    filteredPasswords,
    loading,
    refreshing,
    searchQuery,
    modalVisible,
    modalPasswordVisible,
    passwordVisible,
    editId,
    title,
    username,
    password,
    isDark,
    styles,

    // Handlers
    handleEdit,
    handleDelete,
    handleSaveChanges,
    onRefresh,
    handleSearch,
    closeModal,
    togglePasswordVisibility,
    copyUsername,
    copyPassword,
    setModalPasswordVisible,
  } = usePasswordList();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    {id: 'all', name: 'All', icon: 'apps', count: filteredPasswords.length},
    {
      id: 'social',
      name: 'Social',
      icon: 'people',
      count: getPasswordsByCategory('social').length,
    },
    {
      id: 'work',
      name: 'Work',
      icon: 'work',
      count: getPasswordsByCategory('work').length,
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: 'account-balance',
      count: getPasswordsByCategory('finance').length,
    },
    {
      id: 'games',
      name: 'Games',
      icon: 'gamepad',
      count: getPasswordsByCategory('games').length,
    },

    {
      id: 'personal',
      name: 'Personal',
      icon: 'person',
      count: getPasswordsByCategory('personal').length,
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: 'shopping-cart',
      count: getPasswordsByCategory('shopping').length,
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: 'movie',
      count: getPasswordsByCategory('entertainment').length,
    },
    {
      id: 'other',
      name: 'Other',
      icon: 'more-horiz',
      count: getPasswordsByCategory('other').length,
    },
  ];

  function getPasswordsByCategory(category) {
    return filteredPasswords.filter(
      password => password.category?.toLowerCase() === category.toLowerCase(),
    );
  }

  const getFilteredData = useCallback(() => {
    let data = filteredPasswords;

    if (selectedCategory !== 'all') {
      data = data.filter(
        item => item.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (showFavorites) {
      data = data.filter(item => item.isFavorite === true);
    }

    return data;
  }, [filteredPasswords, selectedCategory, showFavorites]);

  const keyExtractor = useCallback(
    item => item?.id || Math.random().toString(),
    [],
  );

  const renderPasswordItem = useCallback(
    ({item}) => (
      <PasswordItem
        item={item}
        isDark={isDark}
        passwordVisible={passwordVisible}
        loading={loading}
        viewMode={viewMode}
        styles={styles}
        onTogglePasswordVisibility={togglePasswordVisibility}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCopyUsername={copyUsername}
        onCopyPassword={copyPassword}
        onToggleFavorite={toggleFavorite}
      />
    ),
    [
      isDark,
      passwordVisible,
      loading,
      viewMode,
      styles,
      togglePasswordVisibility,
      handleEdit,
      handleDelete,
      copyUsername,
      copyPassword,
    ],
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyState}>
        <View style={styles.emptyIconContainer}>
          <Icon
            name="security"
            size={80}
            color={isDark ? '#333333' : '#cccccc'}
          />
        </View>
        <Text
          style={[styles.emptyTitle, {color: isDark ? '#ffffff' : '#000000'}]}>
          {searchQuery || selectedCategory !== 'all' || showFavorites
            ? 'No matches found'
            : 'No Passwords Yet'}
        </Text>
        <Text
          style={[
            styles.emptySubtitle,
            {color: isDark ? '#cccccc' : '#666666'},
          ]}>
          {searchQuery || selectedCategory !== 'all' || showFavorites
            ? 'Try adjusting your filters or search terms'
            : 'Tap the + button to add your first password'}
        </Text>
      </View>
    ),
    [isDark, searchQuery, selectedCategory, showFavorites],
  );

  const toggleFavorite = useCallback(id => {
    // Implementation for toggling favorite status
    // You'll need to implement this in your usePasswordList hook
    console.log('Toggle favorite for:', id);
  }, []);

  const displayData = getFilteredData();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
      />
      <View style={styles.container}>
        {/* Modern Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Vault</Text>
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[
                  styles.viewToggleBtn,
                  viewMode === 'grid' && styles.viewToggleBtnActive,
                ]}
                onPress={() => setViewMode('grid')}>
                <Icon
                  name="grid-view"
                  size={18}
                  color={
                    viewMode === 'grid'
                      ? '#ffffff'
                      : isDark
                      ? '#cccccc'
                      : '#666666'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewToggleBtn,
                  viewMode === 'list' && styles.viewToggleBtnActive,
                ]}
                onPress={() => setViewMode('list')}>
                <Icon
                  name="list"
                  size={18}
                  color={
                    viewMode === 'list'
                      ? '#ffffff'
                      : isDark
                      ? '#cccccc'
                      : '#666666'
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {displayData.length} credential
              {displayData.length !== 1 ? 's' : ''}
              {(searchQuery || selectedCategory !== 'all' || showFavorites) &&
                ' (filtered)'}
            </Text>
            <TouchableOpacity
              style={[
                styles.favoriteToggle,
                {
                  backgroundColor: showFavorites
                    ? '#ff4757'
                    : isDark
                    ? '#1a1a1a'
                    : '#f0f0f0',
                },
              ]}
              onPress={() => setShowFavorites(!showFavorites)}>
              <Icon
                name="favorite"
                size={16}
                color={
                  showFavorites ? '#ffffff' : isDark ? '#cccccc' : '#666666'
                }
              />
              <Text
                style={[
                  styles.favoriteToggleText,
                  {
                    color: showFavorites
                      ? '#ffffff'
                      : isDark
                      ? '#cccccc'
                      : '#666666',
                  },
                ]}>
                Favorites
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}>
                <Icon
                  name={category.icon}
                  size={16}
                  color={
                    selectedCategory === category.id
                      ? '#ffffff'
                      : isDark
                      ? '#cccccc'
                      : '#666666'
                  }
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id &&
                      styles.categoryTextActive,
                  ]}>
                  {category.name}
                </Text>
                <Text
                  style={[
                    styles.categoryText,
                    styles.categoryCount,
                    selectedCategory === category.id &&
                      styles.categoryTextActive,
                  ]}>
                  {category.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search Bar */}
        <PasswordListSearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          theme={isDark ? 'dark' : 'light'}
        />

        {/* Password List */}
        <FlatList
          data={displayData}
          renderItem={renderPasswordItem}
          keyExtractor={keyExtractor}
          key={viewMode}
          numColumns={viewMode === 'grid' ? 1 : 1}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? '#ffffff' : '#000000'}
              colors={[isDark ? '#ffffff' : '#000000']}
            />
          }
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={
            displayData.length === 0 ? {flex: 1} : {paddingBottom: 100}
          }
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={8}
        />

        {/* FAB */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddPassword')}
          color="#ffffff"
          disabled={loading}
        />

        {/* Enhanced Modal */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={closeModal}
            contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Credentials</Text>
            </View>

            <Formik
              enableReinitialize
              initialValues={{title, username, password}}
              validationSchema={validationSchema}
              onSubmit={handleSaveChanges}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <ScrollView style={styles.modalForm}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Domain"
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      style={styles.input}
                      mode="outlined"
                      outlineColor={isDark ? '#333333' : '#e0e0e0'}
                      activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                      textColor={isDark ? '#ffffff' : '#000000'}
                      disabled={loading || isSubmitting}
                      theme={{
                        colors: {
                          onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                          background: 'transparent',
                        },
                      }}
                    />
                    {touched.title && errors.title && (
                      <Text style={styles.errorText}>{errors.title}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Username"
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      style={styles.input}
                      mode="outlined"
                      outlineColor={isDark ? '#333333' : '#e0e0e0'}
                      activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                      textColor={isDark ? '#ffffff' : '#000000'}
                      disabled={loading || isSubmitting}
                      theme={{
                        colors: {
                          onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                          background: 'transparent',
                        },
                      }}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        label="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry={!modalPasswordVisible}
                        style={[styles.input, styles.passwordInput]}
                        mode="outlined"
                        outlineColor={isDark ? '#333333' : '#e0e0e0'}
                        activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                        textColor={isDark ? '#ffffff' : '#000000'}
                        disabled={loading || isSubmitting}
                        theme={{
                          colors: {
                            onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                            background: 'transparent',
                          },
                        }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setModalPasswordVisible(!modalPasswordVisible)
                        }
                        style={styles.passwordToggle}
                        disabled={loading || isSubmitting}>
                        <Icon
                          name={
                            modalPasswordVisible
                              ? 'visibility'
                              : 'visibility-off'
                          }
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.modalButtons}>
                    <Pressable
                      onPress={closeModal}
                      style={[styles.modalButton, styles.cancelButton]}
                      disabled={loading || isSubmitting}
                      android_ripple={{
                        color: isDark ? '#333333' : '#f0f0f0',
                        borderless: false,
                      }}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>

                    <Pressable
                      onPress={handleSubmit}
                      style={[
                        styles.modalButton,
                        styles.saveButton,
                        (loading || isSubmitting) && styles.disabledButton,
                      ]}
                      disabled={loading || isSubmitting}
                      android_ripple={{
                        color: '#cc3a47',
                        borderless: false,
                      }}>
                      <Text style={styles.saveButtonText}>
                        {loading || isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </Modal>
        </Portal>
      </View>
    </>
  );
};

export default PasswordListScreen;
