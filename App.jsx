import {AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppNavigator from './src/Navigations/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {PasswordProvider} from './src/context/PasswordContext/PasswordContext';
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen';
import {AuthProvider} from './src/Auth/AuthContext';
import {ThemeProvider} from './src/Theme/ThemeProvider';
import AuthLockScreen from './src/components/Biometric/auth/AuthLockScreen';
import BiometricAuthService from './src/components/Biometric/service/BiometricAuth';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'active') {
        const biometricAuthenticated =
          await BiometricAuthService.isAuthenticated();
        const numericAuthenticated =
          await BiometricAuthService.verifyNumericPassword();

        if (!biometricAuthenticated || !numericAuthenticated) {
          setIsAuthenticated(false);
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const checkAuthState = async () => {
    const authenticated = await BiometricAuthService.isAuthenticated();
    setIsAuthenticated(authenticated);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <PasswordProvider>
          <PaperProvider>
            {!isAuthenticated && (
              <AuthLockScreen
                onAuthenticated={() => setIsAuthenticated(true)}
                onSetupRequired={() => {
                  /* navigate to setup */
                }}
              />
            )}
            {isAuthenticated && <AppNavigator />}
          </PaperProvider>
        </PasswordProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
