import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../Theme/ThemeProvider';
import {AuthContext} from '../../Auth/AuthContext';
import {createStyles} from './styles';

export default function SettingScreen() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {signOut, user} = useContext(AuthContext);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);

  const isDark = theme === 'dark';
  const styles = createStyles(isDark);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    rightComponent,
    onPress,
    showArrow = false,
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.settingItemLeft}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingItemRight}>
        {rightComponent}
        {showArrow && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={isDark ? '#666666' : '#999999'}
            style={{marginLeft: 8}}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({title}) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={isDark ? '#ffffff' : '#000000'}
            />
          </View>
          <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        <SectionHeader title="Security" />

        <SettingItem
          icon="fingerprint"
          title="Biometric Authentication"
          subtitle="Use fingerprint or face ID to unlock"
          rightComponent={
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              color={isDark ? '#ffffff' : '#000000'}
            />
          }
        />

        <SettingItem
          icon="lock-clock"
          title="Auto-lock"
          subtitle="Automatically lock after inactivity"
          rightComponent={
            <Switch
              value={autoLockEnabled}
              onValueChange={setAutoLockEnabled}
              color={isDark ? '#ffffff' : '#000000'}
            />
          }
        />

        <SettingItem
          icon="key-change"
          title="Change Master Password"
          subtitle="Update your master password"
          onPress={() =>
            Alert.alert('Coming Soon', 'This feature will be available soon')
          }
          showArrow
        />

        <SectionHeader title="Appearance" />

        <SettingItem
          icon={isDark ? 'weather-night' : 'weather-sunny'}
          title="Dark Mode"
          subtitle={`Currently using ${isDark ? 'dark' : 'light'} theme`}
          rightComponent={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              color={isDark ? '#ffffff' : '#000000'}
            />
          }
        />

        <SectionHeader title="Data" />

        <SettingItem
          icon="backup-restore"
          title="Backup & Sync"
          subtitle="Sync your data across devices"
          onPress={() =>
            Alert.alert('Coming Soon', 'This feature will be available soon')
          }
          showArrow
        />

        <SettingItem
          icon="export"
          title="Export Data"
          subtitle="Export your passwords securely"
          onPress={() =>
            Alert.alert('Coming Soon', 'This feature will be available soon')
          }
          showArrow
        />

        <SettingItem
          icon="import"
          title="Import Data"
          subtitle="Import passwords from other apps"
          onPress={() =>
            Alert.alert('Coming Soon', 'This feature will be available soon')
          }
          showArrow
        />

        <SectionHeader title="Support" />

        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help and contact support"
          onPress={() =>
            Alert.alert('Help', 'Contact us at support@securevault.com')
          }
          showArrow
        />

        <SettingItem
          icon="information-outline"
          title="About"
          subtitle="App version and information"
          onPress={() =>
            Alert.alert(
              'About SecureVault',
              'Version 1.0.0\nBuilt with security in mind',
            )
          }
          showArrow
        />

        <SettingItem
          icon="star-outline"
          title="Rate App"
          subtitle="Help us improve by rating the app"
          onPress={() =>
            Alert.alert('Rate Us', 'Thank you for using SecureVault!')
          }
          showArrow
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>SecureVault v1.0.0</Text>
          <Text style={[styles.versionText, {marginTop: 4}]}>
            Made with ❤️ for your security
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
