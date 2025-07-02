import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Animated,
  AppState,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BiometricAuthService from '../service/BiometricAuth';
import NumericPasswordModal from '../components/NumericPasswordModal';
import {ThemeContext} from '../../../Theme/ThemeProvider';
import {createStyles} from './styles';

const AuthLockScreen = ({onAuthenticated, onSetupRequired}) => {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const styles = createStyles(isDark);

  const [showNumericModal, setShowNumericModal] = useState(false);
  const [biometryType, setBiometryType] = useState('Biometric');
  const [authMethods, setAuthMethods] = useState({
    biometric: false,
    numeric: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [hasAttemptedBiometric, setHasAttemptedBiometric] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    initializeAuth();

    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        setAttempts(0);
        setHasAttemptedBiometric(false);
        initializeAuth();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const initializeAuth = async () => {
    setIsLoading(true);
    try {
      const [biometricEnabled, hasNumericPassword, biometryTypeResult] =
        await Promise.all([
          BiometricAuthService.isBiometricEnabled(),
          BiometricAuthService.hasNumericPassword(),
          BiometricAuthService.getBiometryType(),
        ]);

      setAuthMethods({
        biometric: biometricEnabled,
        numeric: hasNumericPassword,
      });
      setBiometryType(biometryTypeResult);

      // If no authentication methods are set up, redirect to setup
      if (!biometricEnabled && !hasNumericPassword) {
        onSetupRequired?.();
        return;
      }

      // Auto-attempt biometric if enabled and hasn't been attempted yet
      if (biometricEnabled && !hasAttemptedBiometric) {
        setHasAttemptedBiometric(true);
        setTimeout(() => {
          handleBiometricAuth();
        }, 500);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await BiometricAuthService.authenticateWithBiometric(
        'Unlock SecureVault',
        'Use your biometric to unlock the app',
      );

      if (result.success) {
        setTimeout(() => {
          onAuthenticated();
        }, 200);
      } else {
        setAttempts(prev => prev + 1);
        if (authMethods.numeric) {
          // Show numeric password option if available
          setShowNumericModal(true);
        } else {
          Alert.alert(
            'Authentication Failed',
            'Biometric authentication canceled. No numeric password set up.',
            [{text: 'OK'}],
          );
        }
      }
    } catch (error) {
      console.error('Biometric auth error:', error);
      setAttempts(prev => prev + 1);
      if (authMethods.numeric) {
        setShowNumericModal(true);
      } else {
        Alert.alert(
          'Authentication Error',
          'Biometric authentication failed. No numeric password set up.',
          [{text: 'OK'}],
        );
      }
    }
  };

  const handleNumericAuth = async password => {
    try {
      const isValid = await BiometricAuthService.verifyNumericPassword(
        password,
      );

      if (isValid) {
        setShowNumericModal(false);
        setAttempts(0);
        setTimeout(() => {
          onAuthenticated();
        }, 200);
      } else {
        setAttempts(prev => prev + 1);

        if (attempts >= 4) {
          Alert.alert(
            'Too Many Attempts',
            'Please try again later or contact support.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Incorrect Password',
            `Invalid password. ${5 - attempts - 1} attempts remaining.`,
            [{text: 'OK'}],
          );
        }
      }
    } catch (error) {
      console.error('Numeric auth error:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  const handleUseNumeric = () => {
    setShowNumericModal(true);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? '#000000' : '#ffffff'}
        />
        <MaterialCommunityIcons
          name="loading"
          size={40}
          color={isDark ? '#ffffff' : '#000000'}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
      />

      <Animated.View style={[styles.logoContainer, {opacity: fadeAnim}]}>
        <View style={styles.logo}>
          <MaterialCommunityIcons
            name="shield-lock"
            size={50}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </View>
        <Text style={styles.appName}>SecureVault</Text>
        <Text style={styles.tagline}>Your passwords, secured</Text>
      </Animated.View>

      <Animated.View style={[styles.authContainer, {opacity: fadeAnim}]}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Unlock your vault to access your passwords
        </Text>

        {authMethods.biometric && (
          <TouchableOpacity
            style={[styles.authButton, styles.authButtonPrimary]}
            onPress={handleBiometricAuth}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              name={
                biometryType === 'Face ID' ? 'face-recognition' : 'fingerprint'
              }
              size={24}
              color={isDark ? '#000000' : '#ffffff'}
            />
            <Text style={[styles.authButtonText, styles.authButtonTextPrimary]}>
              Use {biometryType}
            </Text>
          </TouchableOpacity>
        )}

        {authMethods.biometric && authMethods.numeric && (
          <Text style={styles.orText}>or</Text>
        )}

        {authMethods.numeric && (
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => setShowNumericModal(true)}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="numeric"
              size={24}
              color={isDark ? '#ffffff' : '#000000'}
            />
            <Text style={styles.authButtonText}>Use Numeric Password</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {authMethods.numeric && (
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Having trouble with biometric authentication?
          </Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={handleUseNumeric}>
            <Text style={styles.helpButtonText}>Use Numeric Password</Text>
          </TouchableOpacity>
        </View>
      )}

      <NumericPasswordModal
        visible={showNumericModal}
        onClose={() => setShowNumericModal(false)}
        onSuccess={handleNumericAuth}
        onForgot={() => {
          Alert.alert(
            'Reset Authentication',
            'This will require you to sign in again and set up your authentication methods. Continue?',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Reset',
                style: 'destructive',
                onPress: async () => {
                  try {
                    await BiometricAuthService.setBiometricEnabled(false);
                    await BiometricAuthService.setNumericPassword('');
                    onSetupRequired?.();
                  } catch (error) {
                    console.error('Error resetting auth:', error);
                  }
                },
              },
            ],
          );
        }}
        title="Enter Password"
        subtitle="Enter your 4-digit password to unlock"
        mode="verify"
      />
    </View>
  );
};

export default AuthLockScreen;
