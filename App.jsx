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

  useEffect(() => {
    if (!loading) {
      checkBiometricAuthState();
    }
  }, [user, loading]);

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'active' && user && isBiometricAuthenticated) {
        setIsBiometricAuthenticated(false);
        setNeedsBiometricAuth(true);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [user, isBiometricAuthenticated]);

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

  if (loading || checkingBiometric) {
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
