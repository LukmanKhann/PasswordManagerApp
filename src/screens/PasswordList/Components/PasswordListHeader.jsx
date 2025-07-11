import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordListHeader = ({
  isDark,
  styles,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory,
  filteredPasswords,
  getPasswordsByCategory,
}) => {
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

  return (
    <>
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Fortress Locker</Text>
            <Text style={styles.headerSubtitle}>
              Easily store, organize, and manage all{'\n'}your passwords in one
              secure, {'\n'}encrypted vault—accessible{'\n'}whenever you need,
              from any device.
            </Text>
          </View>

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
                    ? '#ff4757'
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
                    ? '#ff4757'
                    : isDark
                    ? '#cccccc'
                    : '#666666'
                }
              />
            </TouchableOpacity>
          </View>
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
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}>
                {category.name}
              </Text>
              <Text
                style={[
                  styles.categoryText,
                  styles.categoryCount,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}>
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default PasswordListHeader;
