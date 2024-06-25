import {FlatList, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {FAB, List, IconButton} from 'react-native-paper';
import PasswordContext from './PasswordContext';

const PasswordListScreen = ({navigation}) => {
  const {passwords, deletePassword} = useContext(PasswordContext);

  const renderItem = ({item}) => (
    <List.Item
      title={item.title}
      description={`Username: ${item.username}\nPassword: ${item.password}`}
      left={() => <List.Icon icon="lock-outline" />}
      right={() => (
        <View style={styles.actionIcons}>
          <IconButton
            icon="pencil"
            size={20}
            color="#6200ea"
            onPress={() => navigation.navigate('Edit', {id: item.id})}
          />
          <IconButton
            icon="delete"
            size={20}
            color="#e91e63"
            onPress={() => deletePassword(item.id)}
          />
        </View>
      )}
      onPress={() => {}}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={passwords}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddPassword')}
         color="#FFFFFF"
      />
    </View>
  );
};

export default PasswordListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#121212',
  },
  listItem: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 16,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
