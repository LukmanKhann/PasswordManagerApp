import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  AppState,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BiometricAuthService from '../service/BiometricAuth';
import NumericPasswordModal from '../components/NumericPasswordModal';
import {ThemeContext} from '../../../Theme/ThemeProvider';
import {createStyles} from './styles';
import CustomSnackbar from '../../../CustomSanckBar';
import CustomModal from '../../../components/CustomModal';

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
  const [showBiometricCancelled, setShowBiometricCancelled] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    onConfirm: null,
  });
  const fadeAnim = new Animated.Value(0);
  const shakeAnim = new Animated.Value(0);

  useEffect(() => {
    initializeAuth();

    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        setAttempts(0);
        setHasAttemptedBiometric(false);
        setShowBiometricCancelled(false);
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

      if (!biometricEnabled && !hasNumericPassword) {
        onSetupRequired?.();
        return;
      }

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

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBiometricAuth = async (isCancelled = false) => {
    if (isCancelled) {
      setShowBiometricCancelled(true);
      return;
    }

    try {
      const result = await BiometricAuthService.authenticateWithBiometric(
        'Unlock SecureVault',
        'Use your biometric to unlock the app',
      );

      if (result.success) {
        setShowBiometricCancelled(false);
        setTimeout(() => {
          onAuthenticated();
        }, 200);
      } else {
        setAttempts(prev => prev + 1);
        if (authMethods.numeric) {
          setShowBiometricCancelled(true);
        }
      }
    } catch (error) {
      console.error('Biometric auth error:', error);
      setAttempts(prev => prev + 1);
      if (authMethods.numeric) {
        setShowBiometricCancelled(true);
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
        setShowBiometricCancelled(false);
        setTimeout(() => {
          onAuthenticated();
        }, 200);
        return true;
      } else {
        setAttempts(prev => prev + 1);

        if (attempts >= 4) {
          setModalConfig({
            title: 'Too Many Attempts',
            message: 'Please try again later or contact support.',
            onConfirm: () => setShowCustomModal(false),
          });
          setShowCustomModal(true);
        } else {
          CustomSnackbar.error(
            `Invalid password. ${5 - attempts - 1} attempts remaining.`,
          );
        }
        return false;
      }
    } catch (error) {
      console.error('Numeric auth error:', error);
      CustomSnackbar.error('Authentication failed. Please try again.');
      return false;
    }
  };

  const handleUseNumeric = () => {
    setShowBiometricCancelled(false);
    setShowNumericModal(true);
  };

  const handleRetryBiometric = () => {
    setShowBiometricCancelled(false);
    handleBiometricAuth();
  };

  const handleForgotPassword = () => {
    setTimeout(async () => {
      try {
        await BiometricAuthService.setBiometricEnabled(false);
        await BiometricAuthService.setNumericPassword('');
        setTimeout(() => {
          onSetupRequired?.();
        }, 1000);
      } catch (error) {
        console.error('Error resetting auth:', error);
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? '#000000' : '#ffffff'}
        />
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons
            name="loading"
            size={40}
            color={isDark ? '#ffffff' : '#000000'}
          />
          <Text style={styles.loadingText}>Initializing...</Text>
        </View>
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

      <Animated.View
        style={[
          styles.authContainer,
          {
            opacity: fadeAnim,
            transform: [{translateX: shakeAnim}],
          },
        ]}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Unlock your vault to access your passwords
        </Text>

        {/* Biometric Authentication Cancelled State */}
        {showBiometricCancelled && (
          <View style={styles.cancelledContainer}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={24}
              color={isDark ? '#ff6b6b' : '#e74c3c'}
            />
            <Text style={styles.cancelledText}>
              {biometryType} authentication was cancelled
            </Text>
            <Text style={styles.cancelledSubtext}>
              Choose another method to continue
            </Text>
          </View>
        )}

        {authMethods.biometric && !showBiometricCancelled && (
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

        {/* Show retry and numeric options when biometric is cancelled */}
        {showBiometricCancelled && authMethods.biometric && (
          <View style={styles.retryContainer}>
            <TouchableOpacity
              style={[styles.authButton, styles.authButtonSecondary]}
              onPress={handleRetryBiometric}
              activeOpacity={0.8}>
              <MaterialCommunityIcons
                name={
                  biometryType === 'Face ID'
                    ? 'face-recognition'
                    : 'fingerprint'
                }
                size={24}
                color={isDark ? '#ffffff' : '#000000'}
              />
              <Text style={styles.authButtonText}>
                Try {biometryType} Again
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {((authMethods.biometric &&
          authMethods.numeric &&
          !showBiometricCancelled) ||
          (showBiometricCancelled && authMethods.numeric)) && (
          <Text style={styles.orText}>or</Text>
        )}

        {authMethods.numeric && (
          <TouchableOpacity
            style={[
              styles.authButton,
              showBiometricCancelled && styles.authButtonHighlighted,
            ]}
            onPress={() => setShowNumericModal(true)}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="numeric"
              size={24}
              color={
                showBiometricCancelled
                  ? isDark
                    ? '#000000'
                    : '#ffffff'
                  : isDark
                  ? '#ffffff'
                  : '#000000'
              }
            />
            <Text
              style={[
                styles.authButtonText,
                showBiometricCancelled && styles.authButtonTextHighlighted,
              ]}>
              Use Numeric Password
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {authMethods.numeric && !showBiometricCancelled && (
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
        onForgot={handleForgotPassword}
        title="Enter Password"
        subtitle="Enter your 4-digit password to unlock"
        mode="verify"
      />

      <CustomModal
        visible={showCustomModal}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setShowCustomModal(false)}
        onConfirm={modalConfig.onConfirm}
      />
    </View>
  );
};

export default AuthLockScreen;
