import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingItem = ({
  icon,
  title,
  subtitle,
  rightComponent,
  onPress,
  showArrow = false,
  disabled = false,
  styles,
  isDark,
}) => (
  <TouchableOpacity
    style={[styles.settingItem, disabled && styles.settingItemDisabled]}
    onPress={onPress}
    disabled={!onPress || disabled}>
    <View style={styles.settingItemLeft}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={
            disabled
              ? isDark
                ? '#444444'
                : '#cccccc'
              : isDark
              ? '#ffffff'
              : '#000000'
          }
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.settingTitle,
            disabled && styles.settingTitleDisabled,
          ]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.settingSubtitle,
              disabled && styles.settingSubtitleDisabled,
            ]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    <View style={styles.settingItemRight}>
      {rightComponent}
      {showArrow && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={
            disabled
              ? isDark
                ? '#444444'
                : '#cccccc'
              : isDark
              ? '#666666'
              : '#999999'
          }
          style={{marginLeft: 8}}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default SettingItem;
