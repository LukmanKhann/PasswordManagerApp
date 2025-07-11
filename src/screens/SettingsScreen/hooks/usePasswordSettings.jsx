import {useState} from 'react';
import {Alert} from 'react-native';
import BiometricAuthService from '../../../components/Biometric/service/BiometricAuth';
import CustomSnackbar from '../../../CustomSanckBar';
import CustomModal from '../../../components/CustomModal';

export const usePasswordSettings = (
  hasNumericPassword,
  setHasNumericPassword,
  setBiometricEnabled,
  biometricEnabled, // <-- add this parameter
) => {
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState('set');

  const handleSetNumericPassword = () => {
    if (hasNumericPassword) {
      setShowSetPasswordModal(true);
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
        CustomSnackbar.success(
          'Your numeric password has been set successfully.',
        );
        return true;
      } else {
        CustomSnackbar.error('Failed to set password. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error setting password:', error);
      CustomSnackbar.error('Failed to set password.');
      return false;
    }
  };

  const handleRemoveNumericPassword = () => {
    if (!hasNumericPassword) return;

    Alert.alert(
      'Remove Numeric Password',
      'Are you sure you want to remove your numeric password? This will disable numeric authentication and biometric login.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await BiometricAuthService.setNumericPassword('');
              if (success) {
                setHasNumericPassword(false);
                if (biometricEnabled) {
                  setBiometricEnabled(false, true); // suppress snackbar
                  CustomSnackbar.success('Numeric password and biometric login removed successfully.');
                } else {
                  CustomSnackbar.success('Numeric password removed successfully.');
                }
              } else {
                CustomSnackbar.error('Failed to remove numeric password.');
              }
            } catch (error) {
              console.error('Error removing numeric password:', error);
              CustomSnackbar.error('Error', 'Failed to remove numeric password.');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleChangeMasterPassword = () => {
    CustomSnackbar.info('This feature will be available soon');
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
