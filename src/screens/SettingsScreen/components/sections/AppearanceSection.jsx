import React from 'react';
import {View} from 'react-native';
import {Switch} from 'react-native-paper';
import SettingItem from '../SettingItem';
import SectionHeader from '../SectionHeader';

const AppearanceSection = ({appSettings, styles}) => {
  const {isDark, toggleTheme} = appSettings;

  return (
    <View>
      <SectionHeader title="Appearance" styles={styles} />

      <SettingItem
        icon={isDark ? 'weather-night' : 'weather-sunny'}
        title="Dark Mode"
        subtitle={`Currently using ${isDark ? 'dark' : 'light'} theme`}
        rightComponent={
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: isDark ? '#444444' : '#cccccc',
              true: isDark ? '#ffffff' : '#000000',
            }}
            thumbColor={isDark ? '#000000' : '#ffffff'}
          />
        }
        styles={styles}
        isDark={isDark}
      />
    </View>
  );
};

export default AppearanceSection;
