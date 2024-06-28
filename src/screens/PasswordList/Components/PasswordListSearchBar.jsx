import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';

const PasswordListSearchBar = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        iconColor="#000000"
        rippleColor="#000000"
        onChangeText={onChangeText}
        value={value}
        style={styles.searchbar}
        inputStyle={styles.input}
        placeholderTextColor="#888888"
      />
    </View>
  );
};

export default PasswordListSearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  searchbar: {
    backgroundColor: '#ffffff',
    borderRadius: 1, 
    borderWidth: 0.2,
    borderColor: '#b2b2b2',
  },
  input: {
    color: '#000000',
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000000',
  },
});
