import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStyles} from './styles';
import NumericPasswordModal from '../../components/Biometric/components/NumericPasswordModal';
import {useAppSettings} from './hooks/useAppSettings';
import {usePasswordSettings} from './hooks/usePasswordSettings';
import {useSecuritySettings} from './hooks/useSecuritySettings';

import UserProfileHeader from './components/UserProfileHeader';
import SecuritySection from './components/sections/SecuritySection';
import AppearanceSection from './components/sections/AppearanceSection';
import DataSection from './components/sections/DataSection';
import SupportSection from './components/sections/SupportSection';

export default function SettingScreen() {
  const appSettings = useAppSettings();
  const securitySettings = useSecuritySettings();
  const passwordSettings = usePasswordSettings(
    securitySettings.hasNumericPassword,
    securitySettings.setHasNumericPassword,
    (enabled, suppressSnackbar = false) => securitySettings.handleBiometricToggle(enabled, suppressSnackbar),
    securitySettings.biometricEnabled,
  );

  const {isDark, handleLogout, user} = appSettings;
  const styles = createStyles(isDark);

  if (securitySettings.loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={styles.userName}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* User Profile Header */}
        <UserProfileHeader user={user} styles={styles} isDark={isDark} />

        {/* Security Section */}
        <SecuritySection
          securitySettings={securitySettings}
          passwordSettings={passwordSettings}
          styles={styles}
          isDark={isDark}
        />

        {/* Appearance Section */}
        <AppearanceSection appSettings={appSettings} styles={styles} />

        {/* Data Section */}
        <DataSection appSettings={appSettings} styles={styles} />

        {/* Support Section */}
        <SupportSection appSettings={appSettings} styles={styles} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>SecureVault v1.0.0</Text>
          <Text style={[styles.versionText, {marginTop: 4}]}>
            Made with ❤️ for your security
          </Text>
        </View>
      </ScrollView>

      {/* Password Modals */}
      <NumericPasswordModal
        visible={passwordSettings.showSetPasswordModal}
        onClose={() => passwordSettings.setShowSetPasswordModal(false)}
        onSuccess={passwordSettings.handlePasswordSet}
        title="Set Numeric Password"
        subtitle="Create a 4-digit password to unlock your vault"
        mode="set"
      />

      <NumericPasswordModal
        visible={passwordSettings.showChangePasswordModal}
        onClose={() => passwordSettings.setShowChangePasswordModal(false)}
        onSuccess={passwordSettings.handlePasswordSet}
        title="Change Password"
        subtitle="Create a new 4-digit password"
        mode="set"
      />
    </View>
  );
}
