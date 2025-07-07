import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import BiometricAuthService from '../../../components/Biometric/service/BiometricAuth';
import CustomSnackbar from '../../../CustomSanckBar';

export const useSecuritySettings = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState('Biometric');
  const [hasNumericPassword, setHasNumericPassword] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeSettings();
  }, []);

  const initializeSettings = async () => {
    try {
      setLoading(true);
      const [
        biometricEnabledStatus,
        biometricAvailability,
        biometryTypeResult,
        numericPasswordStatus,
        autoLockStatus,
      ] = await Promise.all([
        BiometricAuthService.isBiometricEnabled(),
        BiometricAuthService.isBiometricAvailable(),
        BiometricAuthService.getBiometryType(),
        BiometricAuthService.hasNumericPassword(),
        BiometricAuthService.isAutoLockEnabled(),
      ]);

      setBiometricEnabled(biometricEnabledStatus);
      setBiometricAvailable(biometricAvailability.available);
      setBiometryType(biometryTypeResult);
      setHasNumericPassword(numericPasswordStatus);
      setAutoLockEnabled(autoLockStatus);
    } catch (error) {
      console.error('Error initializing settings:', error);
      CustomSnackbar.error('Error', 'Failed to load security settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricToggle = async enabled => {
    try {
      if (enabled && !hasNumericPassword) {
        Alert.alert(
          'Numeric Password Required',
          'You must set up a numeric password before enabling biometric authentication.',
          [{text: 'OK', style: 'default'}],
        );
        return false;
      }

      if (enabled && !biometricAvailable) {
        CustomSnackbar.warning(
          'Biometric Not Available',
          'Biometric authentication is not available on this device.',
        );
        return false;
      }

      const success = await BiometricAuthService.setBiometricEnabled(enabled);
      if (success) {
        setBiometricEnabled(enabled);

        if (enabled) {
          CustomSnackbar.success(
            'Biometric Enabled',
            `${biometryType} authentication has been enabled successfully.`,
          );
        } else {
          CustomSnackbar.error(
            'Biometric Disabled',
            'Biometric authentication has been disabled.',
          );
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error toggling biometric:', error);
      CustomSnackbar.error('Error', 'Failed to update biometric settings.');
      return false;
    }
  };

  const handleAutoLockToggle = async enabled => {
    try {
      const success = await BiometricAuthService.setAutoLockEnabled(enabled);
      if (success) {
        setAutoLockEnabled(enabled);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error toggling auto-lock:', error);
      CustomSnackbar.error('Error', 'Failed to update auto-lock settings.');
      return false;
    }
  };

  const getAuthenticationStatus = () => {
    if (biometricEnabled && hasNumericPassword) {
      return `${biometryType} + Numeric`;
    } else if (biometricEnabled) {
      return biometryType;
    } else if (hasNumericPassword) {
      return 'Numeric Only';
    }
    return 'Not Configured';
  };

  const canEnableBiometric = () => {
    return biometricAvailable && hasNumericPassword;
  };

  return {
    // State
    biometricEnabled,
    biometricAvailable,
    biometryType,
    hasNumericPassword,
    autoLockEnabled,
    loading,

    // Actions
    handleBiometricToggle,
    handleAutoLockToggle,
    initializeSettings,

    // Computed values
    getAuthenticationStatus,
    canEnableBiometric,

    // State setters (for password management)
    setHasNumericPassword,
  };
};
