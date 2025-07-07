import {useState} from 'react';
import BiometricAuthService from '../../../components/Biometric/service/BiometricAuth';
import CustomSnackbar from '../../../CustomSanckBar';
import CustomModal from '../../../components/CustomModal';

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

    setShowSetPasswordModal(true);
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
