import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfileHeader = ({user, styles, isDark}) => (
  <View style={styles.header}>
    <View style={styles.profileIcon}>
      <MaterialCommunityIcons
        name="account"
        size={40}
        color={isDark ? '#ffffff' : '#000000'}
      />
    </View>
    <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
    <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
  </View>
);

export default UserProfileHeader;
