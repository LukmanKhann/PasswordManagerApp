import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Domain is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  category: Yup.string(),
  isFavorite: Yup.boolean(),
  labels: Yup.array().of(Yup.string()),
});

export const renderEmptyState = ({styles, isDark, searchQuery}) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIconContainer}>
      <Icon
        name={searchQuery ? 'search-off' : 'security'}
        size={80}
        color={isDark ? '#333333' : '#cccccc'}
      />
    </View>
    <Text style={[styles.emptyTitle, {color: isDark ? '#ffffff' : '#000000'}]}>
      {searchQuery ? 'No matches found' : 'No Passwords Yet'}
    </Text>
    <Text
      style={[styles.emptySubtitle, {color: isDark ? '#cccccc' : '#666666'}]}>
      {searchQuery
        ? 'Try adjusting your search terms or check different categories'
        : 'Secure your digital life by adding your first password'}
    </Text>
    {!searchQuery && (
      <View style={styles.emptyActions}>
        <TouchableOpacity
          style={[
            styles.emptyActionBtn,
            {borderColor: isDark ? '#333333' : '#e0e0e0'},
          ]}>
          <Icon name="add" size={24} color="#ff4757" />
          <Text
            style={[
              styles.emptyActionText,
              {color: isDark ? '#ffffff' : '#000000'},
            ]}>
            Add Password
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

export const passwordUtils = {
  filterPasswords: (
    passwords,
    searchQuery,
    category = 'all',
    showFavorites = false,
  ) => {
    let filtered = passwords;

    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    if (showFavorites) {
      filtered = filtered.filter(item => item.isFavorite);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        item =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.labels &&
            item.labels.some(label =>
              label.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
    }

    return filtered;
  },

  generateSecurePassword: (length = 16, options = {}) => {
    const {
      includeUppercase = true,
      includeLowercase = true,
      includeNumbers = true,
      includeSymbols = true,
      excludeSimilar = true,
    } = options;

    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  },

  getPasswordStrength: password => {
    if (!password) return 'weak';

    let score = 0;
    const checks = {
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
      noRepeats: !/(.)\1{2,}/.test(password),
      noSequence:
        !/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(
          password,
        ),
    };

    score = Object.values(checks).filter(Boolean).length;

    if (score < 4) return 'weak';
    if (score < 6) return 'medium';
    return 'strong';
  },

  getPasswordStrengthDetails: password => {
    const strength = passwordUtils.getPasswordStrength(password);
    const details = {
      score: 0,
      feedback: [],
      color: '#ff4757',
    };

    if (!password) {
      return {...details, feedback: ['Password is required']};
    }

    const checks = {
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
    };

    details.score = Object.values(checks).filter(Boolean).length;

    if (!checks.length) details.feedback.push('Use at least 12 characters');
    if (!checks.lowercase) details.feedback.push('Add lowercase letters');
    if (!checks.uppercase) details.feedback.push('Add uppercase letters');
    if (!checks.numbers) details.feedback.push('Add numbers');
    if (!checks.symbols) details.feedback.push('Add special characters');

    switch (strength) {
      case 'strong':
        details.color = '#2ed573';
        details.feedback = details.feedback.length
          ? details.feedback
          : ['Strong password!'];
        break;
      case 'medium':
        details.color = '#ffa502';
        if (!details.feedback.length)
          details.feedback.push('Good password, consider making it stronger');
        break;
      default:
        details.color = '#ff4757';
        if (!details.feedback.length)
          details.feedback.push('Weak password, please improve');
    }

    return details;
  },

  formatLastUpdated: timestamp => {
    if (!timestamp) return 'Never';

    const now = new Date();
    const updated = new Date(timestamp);
    const diffInMinutes = (now - updated) / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInDays < 7) return `${Math.floor(diffInDays)}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return updated.toLocaleDateString();
  },

  categorizePassword: (title, username) => {
    const domain = title?.toLowerCase() || '';
    const user = username?.toLowerCase() || '';

    // Social media
    if (
      /facebook|twitter|instagram|linkedin|snapchat|tiktok|pinterest|reddit/.test(
        domain,
      )
    ) {
      return 'social';
    }

    // Work related
    if (
      /slack|teams|zoom|office|outlook|gmail|work|company|corp|enterprise/.test(
        domain + user,
      )
    ) {
      return 'work';
    }

    // Financial
    if (
      /bank|paypal|stripe|visa|mastercard|amex|finance|invest|trading|crypto/.test(
        domain,
      )
    ) {
      return 'finance';
    }

    // Entertainment
    if (
      /netflix|spotify|youtube|twitch|steam|gaming|movie|music|video/.test(
        domain,
      )
    ) {
      return 'entertainment';
    }

    return 'personal';
  },

  getDomainIcon: title => {
    const domain = title?.toLowerCase() || '';

    // Common domain to icon mapping
    const iconMap = {
      google: 'mail',
      gmail: 'mail',
      facebook: 'people',
      twitter: 'alternate_email',
      instagram: 'camera_alt',
      linkedin: 'work',
      github: 'code',
      netflix: 'movie',
      spotify: 'music_note',
      paypal: 'payment',
      amazon: 'shopping_cart',
      microsoft: 'business',
      apple: 'phone_iphone',
      slack: 'chat',
      zoom: 'videocam',
      default: 'lock',
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (domain.includes(key)) return icon;
    }

    return iconMap.default;
  },

  exportPasswords: (passwords, format = 'json') => {
    const exportData = passwords.map(item => ({
      title: item.title,
      username: item.username,
      password: item.password,
      category: item.category,
      isFavorite: item.isFavorite,
      labels: item.labels,
      lastUpdated: item.lastUpdated,
      createdAt: item.createdAt,
    }));

    if (format === 'csv') {
      const headers = [
        'Title',
        'Username',
        'Password',
        'Category',
        'Favorite',
        'Labels',
        'Last Updated',
      ];
      const csvContent = [
        headers.join(','),
        ...exportData.map(item =>
          [
            `"${item.title || ''}"`,
            `"${item.username || ''}"`,
            `"${item.password || ''}"`,
            `"${item.category || ''}"`,
            item.isFavorite ? 'Yes' : 'No',
            `"${(item.labels || []).join(';')}"`,
            `"${item.lastUpdated || ''}"`,
          ].join(','),
        ),
      ].join('\n');

      return csvContent;
    }

    return JSON.stringify(exportData, null, 2);
  },

  searchSuggestions: (passwords, query) => {
    if (!query || query.length < 2) return [];

    const suggestions = new Set();
    const lowerQuery = query.toLowerCase();

    passwords.forEach(item => {
      // Add title suggestions
      if (item.title?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.title);
      }

      // Add username suggestions
      if (item.username?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.username);
      }

      // Add category suggestions
      if (item.category?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.category);
      }

      // Add label suggestions
      if (item.labels) {
        item.labels.forEach(label => {
          if (label.toLowerCase().includes(loverQuery)) {
            suggestions.add(label);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 5);
  },
};

export const renderPasswordItem = ({
  item,
  styles,
  isDark,
  passwordVisible,
  loading,
  togglePasswordVisibility,
  handleEdit,
  handleDelete,
  copyUsername,
  copyPassword,
  toggleFavorite,
  viewMode = 'card',
}) => {
  if (!item || !item.id) return null;

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

  const getPasswordStrengthColor = password => {
    if (!password) return '#ff4757';
    const strength = passwordUtils.getPasswordStrength(password);
    return strength === 'strong'
      ? '#2ed573'
      : strength === 'medium'
      ? '#ffa502'
      : '#ff4757';
  };

  return (
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
              onPress={() => toggleFavorite && toggleFavorite(item.id)}
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
            <View style={styles.leftLabels}>
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
              <View
                style={[
                  styles.strengthIndicator,
                  {backgroundColor: getPasswordStrengthColor(item.password)},
                ]}
              />
            </View>
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
          onPress={() => togglePasswordVisibility(item.id)}
          style={styles.actionBtn}
          disabled={loading}>
          <Icon
            name={passwordVisible[item.id] ? 'visibility' : 'visibility-off'}
            size={20}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => copyUsername(item.username)}
          style={styles.actionBtn}
          disabled={loading || !item.username}>
          <Icon
            name="content-copy"
            size={20}
            color={!item.username ? '#999999' : isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => copyPassword(item.password)}
          style={styles.actionBtn}
          disabled={loading || !item.password}>
          <Icon
            name="vpn_key"
            size={20}
            color={!item.password ? '#999999' : isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleEdit(item.id)}
          style={styles.actionBtn}
          disabled={loading}>
          <Icon name="edit" size={20} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
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
          <View style={styles.passwordActions}>
            <TouchableOpacity
              onPress={() => copyPassword(item.password)}
              style={styles.copyPasswordBtn}
              disabled={!item.password}>
              <Icon name="content-copy" size={16} color="#ff4757" />
              <Text style={styles.copyPasswordText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
