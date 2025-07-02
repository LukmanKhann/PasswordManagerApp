import {useState} from 'react';
import {Alert} from 'react-native';
import BiometricAuthService from '../../../components/Biometric/service/BiometricAuth';

export const usePasswordSettings = (
  hasNumericPassword,
  setHasNumericPassword,
  setBiometricEnabled,
) => {
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState('set');

  const handleSetNumericPassword = () => {
    if (hasNumericPassword) {
      Alert.alert(
        'Change Password',
        'You already have a numeric password set. Do you want to change it?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Change',
            onPress: () => {
              setPasswordModalMode('set');
              setShowChangePasswordModal(true);
            },
          },
        ],
      );
    } else {
      setPasswordModalMode('set');
      setShowSetPasswordModal(true);
    }
  };

  const handlePasswordSet = async password => {
    try {
      const success = await BiometricAuthService.setNumericPassword(password);
      if (success) {
        setHasNumericPassword(true);
        setShowSetPasswordModal(false);
        setShowChangePasswordModal(false);
        Alert.alert(
          'Password Set',
          'Your numeric password has been set successfully.',
        );
        return true;
      } else {
        Alert.alert('Error', 'Failed to set password. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error setting password:', error);
      Alert.alert('Error', 'Failed to set password.');
      return false;
    }
  };

  const handleRemoveNumericPassword = () => {
    if (!hasNumericPassword) return;

    Alert.alert(
      'Remove Numeric Password',
      'Are you sure you want to remove your numeric password? This will also disable biometric authentication.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await BiometricAuthService.setNumericPassword('');
              // Disable biometric when removing numeric password
              await BiometricAuthService.setBiometricEnabled(false);

              setHasNumericPassword(false);
              setBiometricEnabled(false);

              Alert.alert(
                'Password Removed',
                'Your numeric password and biometric authentication have been disabled.',
              );
            } catch (error) {
              console.error('Error removing password:', error);
              Alert.alert('Error', 'Failed to remove password.');
            }
          },
        },
      ],
    );
  };

  const handleChangeMasterPassword = () => {
    Alert.alert('Coming Soon', 'This feature will be available soon');
  };

  return {
    // Modal states
    showSetPasswordModal,
    showChangePasswordModal,
    passwordModalMode,

    // Actions
    handleSetNumericPassword,
    handlePasswordSet,
    handleRemoveNumericPassword,
    handleChangeMasterPassword,

    // Modal controls
    setShowSetPasswordModal,
    setShowChangePasswordModal,
  };
};
