import React, {useState} from 'react';
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
}) => {
  const [titleExpanded, setTitleExpanded] = useState(false);
  const [usernameExpanded, setUsernameExpanded] = useState(false);

  const getDomainColor = domain => {
    const colors = [
      '#6366f1',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#06b6d4',
      '#84cc16',
      '#f97316',
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

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderGridItem = () => (
    <View style={styles.passwordCard}>
      {/* Header Section */}
      <View
        style={[
          styles.domainIcon,
          {backgroundColor: getDomainColor(item.title)},
        ]}>
        <Text style={styles.domainIconText}>
          {item.title?.charAt(0)?.toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.cardHeader}>
        {/* Content Section next to domain icon */}
        <View style={styles.cardContentInHeader}>
          <TouchableOpacity
            onPress={() => setTitleExpanded(!titleExpanded)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.cardTitle,
                {color: isDark ? '#ffffff' : '#1f2937'},
              ]}
              numberOfLines={titleExpanded ? 0 : 1}>
              {titleExpanded
                ? item.title || 'Untitled'
                : truncateText(item.title || 'Untitled', 30)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setUsernameExpanded(!usernameExpanded)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.cardUsername,
                {color: isDark ? '#9ca3af' : '#6b7280'},
              ]}
              numberOfLines={usernameExpanded ? 0 : 1}>
              {usernameExpanded
                ? item.username || 'No username'
                : truncateText(item.username || 'No username', 30)}
            </Text>
          </TouchableOpacity>

          {item.category && (
            <View style={styles.cardLabels}>
              <View
                style={[
                  styles.labelChip,
                  {backgroundColor: isDark ? '#374151' : '#f3f4f6'},
                ]}>
                <Text
                  style={[
                    styles.labelText,
                    {color: isDark ? '#d1d5db' : '#4b5563'},
                  ]}>
                  {item.category}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Vertical Action Buttons */}
        <View style={styles.gridActionButtons}>
          <TouchableOpacity
            onPress={() => onTogglePasswordVisibility(item.id)}
            style={[styles.gridActionBtn, styles.primaryAction]}
            disabled={loading}>
            <Icon
              name={passwordVisible[item.id] ? 'visibility-off' : 'visibility'}
              size={16}
              color={'#ffffff'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onCopyUsername(item.username)}
            style={[styles.gridActionBtn, styles.secondaryAction]}
            disabled={loading || !item.username}>
            <Icon
              name="content-copy"
              size={16}
              color={
                !item.username ? '#9ca3af' : isDark ? '#d1d5db' : '#4b5563'
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onCopyPassword(item.password)}
            style={[styles.gridActionBtn, styles.secondaryAction]}
            disabled={loading || !item.password}>
            <Icon
              name="vpn-key"
              size={16}
              color={
                !item.password ? '#9ca3af' : isDark ? '#d1d5db' : '#4b5563'
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onEdit(item.id)}
            style={[styles.gridActionBtn, styles.secondaryAction]}
            disabled={loading}>
            <Icon
              name="edit"
              size={16}
              color={isDark ? '#d1d5db' : '#4b5563'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={[styles.gridActionBtn, styles.deleteAction]}
            disabled={loading}>
            <Icon name="delete" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Password Reveal */}
      {passwordVisible[item.id] && (
        <View style={styles.passwordReveal}>
          <Text
            style={[
              styles.revealedPassword,
              {color: isDark ? '#ffffff' : '#1f2937'},
            ]}>
            {item.password || 'No password'}
          </Text>
        </View>
      )}

      {/* Last Updated */}
      {item.lastUpdated && (
        <Text
          style={[styles.lastUpdated, {color: isDark ? '#6b7280' : '#9ca3af'}]}>
          Updated {formatLastUpdated(item.lastUpdated)}
        </Text>
      )}
    </View>
  );

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
            <TouchableOpacity
              onPress={() => setTitleExpanded(!titleExpanded)}
              activeOpacity={0.7}
              style={{flex: 1}}>
              <Text
                style={[
                  styles.listTitle,
                  {color: isDark ? '#ffffff' : '#1f2937'},
                ]}
                numberOfLines={titleExpanded ? 0 : 1}>
                {titleExpanded
                  ? item.title || 'Untitled'
                  : truncateText(item.title || 'Untitled', 30)}
              </Text>
            </TouchableOpacity>
            {item.isFavorite && (
              <Icon
                name="favorite"
                size={16}
                color="#ff4757"
                style={styles.listFavoriteIcon}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => setUsernameExpanded(!usernameExpanded)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.listUsername,
                {color: isDark ? '#9ca3af' : '#6b7280'},
              ]}
              numberOfLines={usernameExpanded ? 0 : 1}>
              {usernameExpanded
                ? item.username || 'No username'
                : truncateText(item.username || 'No username', 30)}
            </Text>
          </TouchableOpacity>

          <View style={styles.listMetadata}>
            {item.category && (
              <View
                style={[
                  styles.listLabelChip,
                  {backgroundColor: isDark ? '#374151' : '#f3f4f6'},
                ]}>
                <Text
                  style={[
                    styles.listLabelText,
                    {color: isDark ? '#d1d5db' : '#4b5563'},
                  ]}>
                  {item.category}
                </Text>
              </View>
            )}
            {item.lastUpdated && (
              <Text
                style={[
                  styles.listLastUpdated,
                  {color: isDark ? '#6b7280' : '#9ca3af'},
                ]}>
                {formatLastUpdated(item.lastUpdated)}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.listItemActions}>
        <TouchableOpacity
          onPress={() => onTogglePasswordVisibility(item.id)}
          style={[styles.listActionBtn, styles.primaryListAction]}
          disabled={loading}>
          <Icon
            name={passwordVisible[item.id] ? 'visibility-off' : 'visibility'}
            size={18}
            color="#ffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onCopyUsername(item.username)}
          style={[styles.listActionBtn]}
          disabled={loading || !item.username}>
          <Icon
            name="content-copy"
            size={18}
            color={!item.username ? '#9ca3af' : isDark ? '#d1d5db' : '#4b5563'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={styles.listActionBtn}
          disabled={loading}>
          <Icon name="edit" size={18} color={isDark ? '#d1d5db' : '#4b5563'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onCopyPassword(item.password)}
          style={[styles.listActionBtn]}
          disabled={loading || !item.password}>
          <Icon
            name="vpn-key"
            size={18}
            color={!item.password ? '#9ca3af' : isDark ? '#d1d5db' : '#4b5563'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.listActionBtn, styles.deleteListAction]}
          disabled={loading}>
          <Icon name="delete" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* Password Reveal for List */}
      {passwordVisible[item.id] && (
        <View style={styles.listPasswordReveal}>
          <Text
            style={[
              styles.listRevealedPassword,
              {color: isDark ? '#ffffff' : '#1f2937'},
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
