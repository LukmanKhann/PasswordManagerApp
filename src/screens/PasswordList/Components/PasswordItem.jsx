import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordItem = ({
  item,
  isDark,
  passwordVisible,
  loading,
  viewMode,
  styles,
  onTogglePasswordVisibility,
  onEdit,
  onDelete,
  onCopyUsername,
  onCopyPassword,
  onToggleFavorite,
}) => {
  const getDomainColor = domain => {
    const colors = [
      '#ff4757',
      '#5352ed',
      '#2ed573',
      '#ffa502',
      '#747d8c',
      '#a4b0be',
    ];
    const index = domain ? domain.length % colors.length : 0;
    return colors[index];
  };

  const formatLastUpdated = timestamp => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInHours = (now - updated) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return updated.toLocaleDateString();
  };

  const renderGridItem = () => (
    <View style={styles.passwordCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconContainer}>
          <View
            style={[
              styles.domainIcon,
              {backgroundColor: getDomainColor(item.title)},
            ]}>
            <Text style={styles.domainIconText}>
              {item.title?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.cardTitle,
                {color: isDark ? '#ffffff' : '#000000'},
              ]}
              numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            <TouchableOpacity
              onPress={() => onToggleFavorite(item.id)}
              style={styles.favoriteButton}>
              <Icon
                name={item.isFavorite ? 'favorite' : 'favorite-border'}
                size={18}
                color={
                  item.isFavorite ? '#ff4757' : isDark ? '#666666' : '#cccccc'
                }
              />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.cardUsername,
              {color: isDark ? '#cccccc' : '#666666'},
            ]}
            numberOfLines={1}>
            {item.username || 'No username'}
          </Text>

          <View style={styles.cardLabels}>
            {item.category && (
              <View
                style={[
                  styles.labelChip,
                  {backgroundColor: isDark ? '#333333' : '#f0f0f0'},
                ]}>
                <Text
                  style={[
                    styles.labelText,
                    {color: isDark ? '#cccccc' : '#666666'},
                  ]}>
                  {item.category}
                </Text>
              </View>
            )}
            {item.lastUpdated && (
              <Text
                style={[
                  styles.lastUpdated,
                  {color: isDark ? '#666666' : '#999999'},
                ]}>
                {formatLastUpdated(item.lastUpdated)}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => onTogglePasswordVisibility(item.id)}
          style={styles.actionBtn}
          disabled={loading}>
          <Icon
            name={passwordVisible[item.id] ? 'visibility' : 'visibility-off'}
            size={20}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onCopyUsername(item.username)}
          style={styles.actionBtn}
          disabled={loading || !item.username}>
          <Icon
            name="content-copy"
            size={20}
            color={!item.username ? '#999999' : isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onCopyPassword(item.password)}
          style={styles.actionBtn}
          disabled={loading || !item.password}>
          <Icon
            name="vpn-key"
            size={20}
            color={!item.password ? '#999999' : isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={styles.actionBtn}
          disabled={loading}>
          <Icon name="edit" size={20} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.actionBtn, styles.deleteBtn]}
          disabled={loading}>
          <Icon name="delete" size={20} color="#ff4757" />
        </TouchableOpacity>
      </View>

      {passwordVisible[item.id] && (
        <View style={styles.passwordReveal}>
          <Text
            style={[
              styles.revealedPassword,
              {color: isDark ? '#ffffff' : '#000000'},
            ]}>
            {item.password || 'No password'}
          </Text>
        </View>
      )}
    </View>
  );

  // List View Render
  const renderListItem = () => (
    <View style={styles.passwordListItem}>
      <View style={styles.listItemLeft}>
        <View
          style={[
            styles.listDomainIcon,
            {backgroundColor: getDomainColor(item.title)},
          ]}>
          <Text style={styles.listDomainIconText}>
            {item.title?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>

        <View style={styles.listItemContent}>
          <View style={styles.listTitleRow}>
            <Text
              style={[
                styles.listTitle,
                {color: isDark ? '#ffffff' : '#000000'},
              ]}
              numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            {item.isFavorite && (
              <Icon
                name="favorite"
                size={16}
                color="#ff4757"
                style={styles.listFavoriteIcon}
              />
            )}
          </View>
          <Text
            style={[
              styles.listUsername,
              {color: isDark ? '#cccccc' : '#666666'},
            ]}
            numberOfLines={1}>
            {item.username || 'No username'}
          </Text>
          {item.category && (
            <Text
              style={[
                styles.listCategory,
                {color: isDark ? '#666666' : '#999999'},
              ]}>
              {item.category}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.listItemActions}>
        <TouchableOpacity
          onPress={() => onToggleFavorite(item.id)}
          style={styles.listActionBtn}>
          <Icon
            name={item.isFavorite ? 'favorite' : 'favorite-border'}
            size={18}
            color={item.isFavorite ? '#ff4757' : isDark ? '#666666' : '#cccccc'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onCopyUsername(item.username)}
          style={styles.listActionBtn}
          disabled={loading || !item.username}>
          <Icon
            name="content-copy"
            size={18}
            color={!item.username ? '#999999' : isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onCopyPassword(item.password)}
          style={styles.listActionBtn}
          disabled={loading || !item.password}>
          <Icon
            name="vpn-key"
            size={18}
            color={!item.password ? '#999999' : isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={styles.listActionBtn}
          disabled={loading}>
          <Icon name="edit" size={18} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
      </View>

      {passwordVisible[item.id] && (
        <View style={styles.listPasswordReveal}>
          <Text
            style={[
              styles.listRevealedPassword,
              {color: isDark ? '#ffffff' : '#000000'},
            ]}>
            {item.password || 'No password'}
          </Text>
        </View>
      )}
    </View>
  );

  return viewMode === 'grid' ? renderGridItem() : renderListItem();
};

export default PasswordItem;
