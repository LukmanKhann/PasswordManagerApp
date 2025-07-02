import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingItem from '../SettingItem';
import SectionHeader from '../SectionHeader';

const SecuritySection = ({
  securitySettings,
  passwordSettings,
  styles,
  isDark,
}) => {
  const {
    biometricEnabled,
    biometricAvailable,
    biometryType,
    hasNumericPassword,
    autoLockEnabled,
    handleBiometricToggle,
    handleAutoLockToggle,
    getAuthenticationStatus,
    canEnableBiometric,
  } = securitySettings;

  const {
    handleSetNumericPassword,
    handleRemoveNumericPassword,
    handleChangeMasterPassword,
  } = passwordSettings;

  return (
    <View>
      <SectionHeader title="Security" styles={styles} />

      <SettingItem
        icon="shield-lock"
        title="Authentication Status"
        subtitle={`Current: ${getAuthenticationStatus()}`}
        rightComponent={
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={isDark ? '#666666' : '#999999'}
          />
        }
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon={biometryType === 'Face ID' ? 'face-recognition' : 'fingerprint'}
        title={`${biometryType} Authentication`}
        subtitle={
          !hasNumericPassword
            ? 'Requires numeric password to be set first'
            : biometricAvailable
            ? `Use ${biometryType.toLowerCase()} to unlock`
            : 'Not available on this device'
        }
        disabled={!canEnableBiometric()}
        rightComponent={
          <Switch
            value={biometricEnabled}
            onValueChange={handleBiometricToggle}
            disabled={!canEnableBiometric()}
            trackColor={{
              false: isDark ? '#444444' : '#cccccc',
              true: isDark ? '#ffffff' : '#000000',
            }}
            thumbColor={
              biometricEnabled
                ? isDark
                  ? '#000000'
                  : '#ffffff'
                : isDark
                ? '#666666'
                : '#999999'
            }
          />
        }
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="numeric"
        title="Numeric Password"
        subtitle={
          hasNumericPassword
            ? 'Use 4-digit password to unlock'
            : 'Set up numeric password'
        }
        onPress={handleSetNumericPassword}
        rightComponent={
          hasNumericPassword ? (
            <TouchableOpacity
              onPress={handleRemoveNumericPassword}
              style={{padding: 4}}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#ff4444"
              />
            </TouchableOpacity>
          ) : null
        }
        showArrow={!hasNumericPassword}
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="lock-clock"
        title="Auto-lock"
        subtitle="Automatically lock after inactivity"
        rightComponent={
          <Switch
            value={autoLockEnabled}
            onValueChange={handleAutoLockToggle}
            trackColor={{
              false: isDark ? '#444444' : '#cccccc',
              true: isDark ? '#ffffff' : '#000000',
            }}
            thumbColor={
              autoLockEnabled
                ? isDark
                  ? '#000000'
                  : '#ffffff'
                : isDark
                ? '#666666'
                : '#999999'
            }
          />
        }
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="key-change"
        title="Change Master Password"
        subtitle="Update your master password"
        onPress={handleChangeMasterPassword}
        showArrow
        styles={styles}
        isDark={isDark}
      />
    </View>
  );
};

export default SecuritySection;
