import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../Theme/ThemeProvider';
import { AuthContext } from '../../Auth/AuthContext';

const { width } = Dimensions.get('window');

export default function SettingScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { signOut, user } = useContext(AuthContext);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);

  const isDark = theme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, rightComponent, onPress, showArrow = false }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8' }]}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.settingItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDark ? '#333333' : '#e8e8e8' }]}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: isDark ? '#cccccc' : '#666666' }]}>
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
            color={isDark ? '#666666' : '#999999'}
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={[styles.sectionHeader, { color: isDark ? '#cccccc' : '#666666' }]}>
      {title}
    </Text>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    header: {
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
    },
    profileIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDark ? '#333333' : '#e8e8e8',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
    },
    sectionHeader: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 32,
      marginBottom: 12,
      marginHorizontal: 20,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginHorizontal: 16,
      marginBottom: 8,
      borderRadius: 12,
    },
    settingItemLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: 14,
    },
    settingItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutButton: {
      backgroundColor: '#ff3b30',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 12,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoutButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 8,
    },
    versionContainer: {
      alignItems: 'center',
      marginTop: 30,
      paddingHorizontal: 20,
    },
    versionText: {
      fontSize: 14,
      color: isDark ? '#666666' : '#999999',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={isDark ? '#ffffff' : '#000000'}
            />
          </View>
          <Text style={styles.userName}>
            {user?.displayName || 'User'}
          </Text>
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
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
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
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
          showArrow
        />

        <SettingItem
          icon="export"
          title="Export Data"
          subtitle="Export your passwords securely"
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
          showArrow
        />

        <SettingItem
          icon="import"
          title="Import Data"
          subtitle="Import passwords from other apps"
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
          showArrow
        />

        <SectionHeader title="Support" />
        
        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help and contact support"
          onPress={() => Alert.alert('Help', 'Contact us at support@securevault.com')}
          showArrow
        />

        <SettingItem
          icon="information-outline"
          title="About"
          subtitle="App version and information"
          onPress={() => Alert.alert('About SecureVault', 'Version 1.0.0\nBuilt with security in mind')}
          showArrow
        />

        <SettingItem
          icon="star-outline"
          title="Rate App"
          subtitle="Help us improve by rating the app"
          onPress={() => Alert.alert('Rate Us', 'Thank you for using SecureVault!')}
          showArrow
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="#ffffff"
          />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            SecureVault v1.0.0
          </Text>
          <Text style={[styles.versionText, { marginTop: 4 }]}>
            Made with ❤️ for your security
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}