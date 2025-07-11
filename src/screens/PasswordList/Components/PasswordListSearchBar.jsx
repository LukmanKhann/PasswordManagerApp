import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../../../Theme/ThemeProvider';

const PasswordListSearchBar = ({
  value,
  onChangeText,
  sortOrder,
  onSortChange,
  viewMode,
  setViewMode,
}) => {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleSortToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(newOrder);
  };

  return (
    <View style={styles.container}>
      {/* Search Section */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}>
        <Icon
          name="search"
          size={20}
          color={isDark ? '#94a3b8' : '#64748b'}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: isDark ? '#f1f5f9' : '#0f172a',
            },
          ]}
          placeholder="Search passwords..."
          placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={styles.clearButton}
            activeOpacity={0.7}>
            <Icon
              name="clear"
              size={18}
              color={isDark ? '#94a3b8' : '#64748b'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Section */}
      <TouchableOpacity
        onPress={handleSortToggle}
        style={[
          styles.sortButton,
          {
            backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}
        activeOpacity={0.7}>
        <Icon
          name={sortOrder === 'asc' ? 'sort-by-alpha' : 'sort-by-alpha'}
          size={20}
          color={isDark ? '#6366f1' : '#4f46e5'}
          style={{
            transform: [{scaleX: sortOrder === 'desc' ? -1 : 1}],
          }}
        />
        <Text
          style={[
            styles.sortText,
            {
              color: isDark ? '#6366f1' : '#4f46e5',
            },
          ]}>
          {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </Text>
      </TouchableOpacity>

      {/* Grid/List View Toggle Section */}
      <TouchableOpacity
        onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        style={[
          styles.sortButton,
          {
            backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}
        activeOpacity={0.7}>
        <Icon
          name={viewMode === 'grid' ? 'grid-view' : 'list'}
          size={20}
          color={isDark ? '#6366f1' : '#4f46e5'}
        />
        <Text
          style={[
            styles.sortText,
            {
              color: isDark ? '#6366f1' : '#4f46e5',
            },
          ]}>
          {viewMode === 'grid' ? 'Grid' : 'List'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordListSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
    minHeight: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 60,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
