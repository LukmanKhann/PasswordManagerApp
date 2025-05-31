import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {ThemeContext} from '../../../Theme/ThemeProvider';

const PasswordListSearchBar = ({value, onChangeText}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#121212' : '#ffffff'},
      ]}>
      <Searchbar
        placeholder="Search"
        iconColor={theme === 'dark' ? '#ffffff' : '#000000'}
        rippleColor={theme === 'dark' ? '#ffffff' : '#000000'}
        onChangeText={onChangeText}
        value={value}
        style={[
          styles.searchbar,
          {borderColor: theme === 'dark' ? '#ffffff' : '#b2b2b2'},
        ]}
        inputStyle={styles.input}
        placeholderTextColor={theme === 'dark' ? '#666666' : '#888888'}
      />
    </View>
  );
};

export default PasswordListSearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  searchbar: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 0,
  },
  input: {
    color: '#000000',
  },
});
