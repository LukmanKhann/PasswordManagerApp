import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPasswordScreen from '../screens/AddPassword/AddPasswordScreen';
import PasswordListScreen from '../screens/PasswordList/PasswordListScreen';
import SettingScreen from '../screens/SettingsScreen/SettingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Passwords"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000000',
          headerTitleAlign: 'center',
          tabBarActiveTintColor: '#000000',
        }}>
        <Tab.Screen
          name="Passwords"
          component={PasswordListScreen}
          options={{
            title: 'Credentials',
            tabBarLabel: 'Credentials List',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                testID={'materialIcon'}
                name="folder"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddPassword"
          component={AddPasswordScreen}
          options={{
            title: 'Add Credentials',
            tabBarLabel: 'Add Credentials',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                testID={'materialIcon'}
                name="lock"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                testID={'materialIcon'}
                name="tune"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
