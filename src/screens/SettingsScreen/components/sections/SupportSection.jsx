import React from 'react';
import {View} from 'react-native';
import SettingItem from '../SettingItem';
import SectionHeader from '../SectionHeader';

const SupportSection = ({appSettings, styles}) => {
  const {isDark, handleHelpSupport, handleAbout, handleRateApp} = appSettings;

  return (
    <View>
      <SectionHeader title="Support" styles={styles} />

      <SettingItem
        icon="help-circle-outline"
        title="Help & Support"
        subtitle="Get help and contact support"
        onPress={handleHelpSupport}
        showArrow
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="information-outline"
        title="About"
        subtitle="App version and information"
        onPress={handleAbout}
        showArrow
        styles={styles}
        isDark={isDark}
      />

      <SettingItem
        icon="star-outline"
        title="Rate App"
        subtitle="Help us improve by rating the app"
        onPress={handleRateApp}
        showArrow
        styles={styles}
        isDark={isDark}
      />
    </View>
  );
};

export default SupportSection;
