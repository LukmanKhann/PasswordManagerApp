import React from 'react';
import {View} from 'react-native';
import SettingItem from '../SettingItem';
import SectionHeader from '../SectionHeader';

const DataSection = ({appSettings, styles}) => {
  const {isDark, handleBackupSync, handleExportData, handleImportData} =
    appSettings;

  return (
    <View>
      <SectionHeader title="Data" styles={styles} />

      <SettingItem
        icon="backup-restore"
        title="Backup & Sync"
        subtitle="Sync your data across devices"
        onPress={handleBackupSync}
        showArrow
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="export"
        title="Export Data"
        subtitle="Export your passwords securely"
        onPress={handleExportData}
        showArrow
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="import"
        title="Import Data"
        subtitle="Import passwords from other apps"
        onPress={handleImportData}
        showArrow
        styles={styles}
        isDark={isDark}
      />
    </View>
  );
};

export default DataSection;
