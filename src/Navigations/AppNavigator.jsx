import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPasswordScreen from '../screens/AddPassword/AddPasswordScreen';
import PasswordListScreen from '../screens/PasswordList/PasswordListScreen';
import SettingScreen from '../screens/SettingsScreen/SettingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordGenerator from '../screens/PasswordGenerator/PasswordGenerator';
import {AuthContext} from '../Auth/AuthContext';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {ThemeContext} from '../Theme/ThemeProvider';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = ({isAuthenticated}) => {
  const {user, loading} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const isDark = theme === 'dark';

  if (loading) {
    return <LoadingScreen />;
  }

  const navigationRef = useRef();
  const [navState, setNavState] = useState();
  const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        if (state) setNavState(state);
      } catch (e) {}
    };
    restoreState();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={navState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      {user ? (
        <Tab.Navigator
          initialRouteName="Passwords"
          screenOptions={{
            headerStyle: {
              backgroundColor: isDark ? '#000000' : '#ffffff',
            },
            headerTintColor: isDark ? '#ffffff' : '#000000',
            headerTitleAlign: 'center',
            tabBarStyle: {
              backgroundColor: isDark ? '#000000' : '#ffffff',
              borderTopColor: isDark ? '#333333' : '#e0e0e0',
            },
            tabBarActiveTintColor: isDark ? '#ffffff' : '#000000',
            tabBarInactiveTintColor: isDark ? '#666666' : '#999999',
          }}>
          <Tab.Screen
            name="Passwords"
            component={PasswordListScreen}
            options={{
              title: 'Vault',
              tabBarLabel: 'Vault',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  testID={'materialIcon'}
                  name="clipboard-file"
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
              title: 'Credentials',
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
            name="PasswordGenerator"
            component={PasswordGenerator}
            options={{
              title: 'Generator',
              tabBarLabel: 'Generator',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  testID={'materialIcon'}
                  name="cog-refresh"
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
