import React, {useState} from 'react';
import {View, FlatList, RefreshControl, Text, StatusBar} from 'react-native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PasswordListSearchBar from './Components/PasswordListSearchBar';
import {usePasswordList} from './hooks/usePasswordList';
import PasswordItem from './Components/PasswordItem';
import EditPasswordModal from './Components/EditPasswordModal';
import PasswordListHeader from './Components/PasswordListHeader';

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
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState('asc');

  const getPasswordsByCategory = category => {
    return filteredPasswords.filter(
      password => password.category?.toLowerCase() === category.toLowerCase(),
    );
  };

  const getFilteredData = () => {
    let data = filteredPasswords;

    if (selectedCategory !== 'all') {
      data = data.filter(
        item => item.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    data = [...data].sort((a, b) => {
      const titleA = (a.title || 'Untitled').toLowerCase();
      const titleB = (b.title || 'Untitled').toLowerCase();

      if (sortOrder === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    return data;
  };

  const handleSortChange = newSortOrder => {
    setSortOrder(newSortOrder);
  };

  const keyExtractor = item => item?.id || Math.random().toString();

  const renderPasswordItem = ({item}) => (
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
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Icon
          name="security"
          size={64}
          color={isDark ? '#475569' : '#94a3b8'}
        />
      </View>
      <Text
        style={[styles.emptyTitle, {color: isDark ? '#f1f5f9' : '#0f172a'}]}>
        {searchQuery || selectedCategory !== 'all'
          ? 'No matches found'
          : 'No Passwords Yet'}
      </Text>
      <Text
        style={[styles.emptySubtitle, {color: isDark ? '#94a3b8' : '#64748b'}]}>
        {searchQuery || selectedCategory !== 'all'
          ? 'Try adjusting your filters or search terms'
          : 'Tap the + button to add your first password'}
      </Text>
    </View>
  );

  const displayData = getFilteredData();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#0f172a' : '#f8fafc'}
      />
      <View style={styles.container}>
        <PasswordListHeader
          isDark={isDark}
          styles={styles}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredPasswords={filteredPasswords}
          getPasswordsByCategory={getPasswordsByCategory}
        />

        {/* Enhanced Search Bar with Sorting */}
        <PasswordListSearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        {/* Password List */}
        <FlatList
          data={displayData}
          renderItem={renderPasswordItem}
          keyExtractor={keyExtractor}
          key={`${viewMode}-${displayData.length}-${sortOrder}`}
          numColumns={viewMode === 'grid' ? 2 : 1}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? '#f1f5f9' : '#0f172a'}
              colors={[isDark ? '#f1f5f9' : '#0f172a']}
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
          getItemLayout={
            viewMode === 'grid'
              ? undefined
              : (data, index) => ({
                  length: 120,
                  offset: 120 * index,
                  index,
                })
          }
        />

        {/* FAB */}
        <FAB
          style={[styles.fab]}
          icon="plus"
          onPress={() => navigation.navigate('AddPassword')}
          color={isDark ? '#000000' : '#ffffff'}
          disabled={loading}
        />

        {/* Edit Password Modal */}
        <EditPasswordModal
          visible={modalVisible}
          onDismiss={closeModal}
          onSave={handleSaveChanges}
          title={title}
          username={username}
          password={password}
          passwordVisible={modalPasswordVisible}
          onTogglePasswordVisibility={setModalPasswordVisible}
          isDark={isDark}
          loading={loading}
          styles={styles}
        />
      </View>
    </>
  );
};

export default PasswordListScreen;
