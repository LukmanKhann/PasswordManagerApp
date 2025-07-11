import {AppState} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AppNavigator from './src/Navigations/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {PasswordProvider} from './src/context/PasswordContext/PasswordContext';
import {AuthProvider, AuthContext} from './src/Auth/AuthContext';
import {ThemeProvider} from './src/Theme/ThemeProvider';
import AuthLockScreen from './src/components/Biometric/auth/AuthLockScreen';
import BiometricAuthService from './src/components/Biometric/service/BiometricAuth';
import LoadingScreen from './src/LoadingScreen/LoadingScreen';

const AppContent = () => {
  const {user, loading} = useContext(AuthContext);
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState(false);
  const [needsBiometricAuth, setNeedsBiometricAuth] = useState(false);
  const [checkingBiometric, setCheckingBiometric] = useState(true);
  const [minimumLoading, setMinimumLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      checkBiometricAuthState();
    }
  }, [user, loading]);

  // Only require biometric auth if app was killed, not just backgrounded
  useEffect(() => {
    let lastState = AppState.currentState;
    const handleAppStateChange = async nextAppState => {
      if (lastState.match(/inactive|background/) && nextAppState === 'active') {
        // App is returning from background, do NOT reset biometric unless app was killed
        // Optionally, check a flag in AsyncStorage to see if app was killed
        // If you want to force auth after long inactivity, add logic here
      }
      lastState = nextAppState;
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  const checkBiometricAuthState = async () => {
    try {
      setCheckingBiometric(true);

      if (user) {
        const biometricEnabled =
          await BiometricAuthService.isBiometricEnabled();
        const hasNumericPassword =
          await BiometricAuthService.hasNumericPassword();

        if (biometricEnabled || hasNumericPassword) {
          setNeedsBiometricAuth(true);
          setIsBiometricAuthenticated(false);
        } else {
          setIsBiometricAuthenticated(true);
          setNeedsBiometricAuth(false);
        }
      } else {
        setIsBiometricAuthenticated(false);
        setNeedsBiometricAuth(false);
      }
    } catch (error) {
      console.error('Error checking biometric auth state:', error);
      setIsBiometricAuthenticated(false);
      setNeedsBiometricAuth(false);
    } finally {
      setCheckingBiometric(false);
    }
  };

  const handleBiometricAuthenticated = () => {
    setIsBiometricAuthenticated(true);
    setNeedsBiometricAuth(false);
  };

  const handleBiometricSetupRequired = () => {
    setIsBiometricAuthenticated(true);
    setNeedsBiometricAuth(false);
  };

  if (loading || checkingBiometric || minimumLoading) {
    return <LoadingScreen />;
  }

  if (user && needsBiometricAuth && !isBiometricAuthenticated) {
    return (
      <AuthLockScreen
        onAuthenticated={handleBiometricAuthenticated}
        onSetupRequired={handleBiometricSetupRequired}
      />
    );
  }

  return <AppNavigator isAuthenticated={!!user} />;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PasswordProvider>
          <PaperProvider>
            <AppContent />
          </PaperProvider>
        </PasswordProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
