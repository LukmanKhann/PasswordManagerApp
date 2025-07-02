import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const rnBiometrics = new ReactNativeBiometrics();

class BiometricAuthService {
  static BIOMETRIC_ENABLED_KEY = 'biometric_enabled';
  static NUMERIC_PASSWORD_KEY = 'numeric_password';
  static AUTO_LOCK_KEY = 'auto_lock_enabled';
  static IS_AUTHENTICATED_KEY = 'is_authenticated';
  static LAST_AUTH_TIME_KEY = 'last_auth_time';

  static async isBiometricAvailable() {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      return {
        available,
        biometryType,
      };
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return {available: false, biometryType: null};
    }
  }

  static async setBiometricEnabled(enabled) {
    try {
      if (enabled) {
        const {available} = await this.isBiometricAvailable();
        if (!available) {
          Alert.alert(
            'Biometric Not Available',
            'Biometric authentication is not available on this device.',
          );
          return false;
        }

        const result = await this.authenticateWithBiometric(
          'Enable Biometric Authentication',
          'Please verify your identity to enable biometric authentication',
        );

        if (result.success) {
          await AsyncStorage.setItem(this.BIOMETRIC_ENABLED_KEY, 'true');
          return true;
        }
        return false;
      } else {
        await AsyncStorage.setItem(this.BIOMETRIC_ENABLED_KEY, 'false');
        return true;
      }
    } catch (error) {
      console.error('Error setting biometric enabled:', error);
      return false;
    }
  }

  static async isBiometricEnabled() {
    try {
      const enabled = await AsyncStorage.getItem(this.BIOMETRIC_ENABLED_KEY);
      return enabled === 'true';
    } catch (error) {
      console.error('Error checking biometric enabled:', error);
      return false;
    }
  }

  static async authenticateWithBiometric(
    promptTitle = 'Authenticate',
    promptMessage = 'Please verify your identity',
  ) {
    try {
      const {available} = await this.isBiometricAvailable();
      if (!available) {
        return {success: false, error: 'Biometric not available'};
      }

      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage,
        fallbackPromptMessage: 'Use Numeric Password',
      });

      if (success) {
        await this.setAuthenticationState(true);
      }

      return {success, error};
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return {success: false, error: error.message};
    }
  }

  static async setNumericPassword(password) {
    try {
      if (!password || password.length === 0) {
        await AsyncStorage.removeItem(this.NUMERIC_PASSWORD_KEY);
        return true;
      }

      if (password.length < 4) {
        throw new Error('Password must be at least 4 digits');
      }
      await AsyncStorage.setItem(this.NUMERIC_PASSWORD_KEY, password);
      return true;
    } catch (error) {
      console.error('Error setting numeric password:', error);
      return false;
    }
  }

  static async verifyNumericPassword(inputPassword) {
    try {
      const storedPassword = await AsyncStorage.getItem(
        this.NUMERIC_PASSWORD_KEY,
      );
      const isValid = storedPassword === inputPassword;

      if (isValid) {
        await this.setAuthenticationState(true);
      }

      return isValid;
    } catch (error) {
      console.error('Error verifying numeric password:', error);
      return false;
    }
  }

  static async hasNumericPassword() {
    try {
      const password = await AsyncStorage.getItem(this.NUMERIC_PASSWORD_KEY);
      return password !== null && password.length > 0;
    } catch (error) {
      console.error('Error checking numeric password:', error);
      return false;
    }
  }

  static async setAutoLockEnabled(enabled) {
    try {
      await AsyncStorage.setItem(this.AUTO_LOCK_KEY, enabled.toString());
      return true;
    } catch (error) {
      console.error('Error setting auto-lock:', error);
      return false;
    }
  }

  static async isAutoLockEnabled() {
    try {
      const enabled = await AsyncStorage.getItem(this.AUTO_LOCK_KEY);
      return enabled !== 'false'; // Default to true
    } catch (error) {
      console.error('Error getting auto-lock:', error);
      return true;
    }
  }

  static async setAuthenticationState(isAuthenticated) {
    try {
      await AsyncStorage.setItem(
        this.IS_AUTHENTICATED_KEY,
        isAuthenticated.toString(),
      );
      if (isAuthenticated) {
        await AsyncStorage.setItem(
          this.LAST_AUTH_TIME_KEY,
          Date.now().toString(),
        );
      } else {
        await AsyncStorage.removeItem(this.LAST_AUTH_TIME_KEY);
      }
    } catch (error) {
      console.error('Error setting authentication state:', error);
    }
  }

  static async isAuthenticated() {
    try {
      const isAuth = await AsyncStorage.getItem(this.IS_AUTHENTICATED_KEY);
      const lastAuthTime = await AsyncStorage.getItem(this.LAST_AUTH_TIME_KEY);

      if (isAuth !== 'true' || !lastAuthTime) {
        return false;
      }

      const autoLockEnabled = await this.isAutoLockEnabled();
      if (autoLockEnabled) {
        const authTime = parseInt(lastAuthTime);
        const currentTime = Date.now();
        const timeDiff = currentTime - authTime;

        const autoLockTimeout = 300000;

        if (timeDiff > autoLockTimeout) {
          await this.setAuthenticationState(false);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error checking authentication state:', error);
      return false;
    }
  }

  static async logout() {
    try {
      await this.setAuthenticationState(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  static async authenticate() {
    try {
      const isBiometricEnabled = await this.isBiometricEnabled();
      const hasNumericPassword = await this.hasNumericPassword();

      if (!isBiometricEnabled && !hasNumericPassword) {
        return {success: false, error: 'No authentication method configured'};
      }

      if (isBiometricEnabled) {
        const biometricResult = await this.authenticateWithBiometric(
          'Unlock SecureVault',
          'Use your biometric to unlock the app',
        );

        if (biometricResult.success) {
          return {success: true, method: 'biometric'};
        }

        if (hasNumericPassword) {
          return {
            success: false,
            error: 'biometric_failed',
            fallback: 'numeric',
          };
        }

        return {success: false, error: biometricResult.error};
      }

      if (hasNumericPassword) {
        return {success: false, error: 'numeric_required', fallback: 'numeric'};
      }

      return {success: false, error: 'No authentication method available'};
    } catch (error) {
      console.error('Authentication error:', error);
      return {success: false, error: error.message};
    }
  }

  static async getBiometryType() {
    try {
      const {biometryType} = await this.isBiometricAvailable();
      switch (biometryType) {
        case 'TouchID':
          return 'Touch ID';
        case 'FaceID':
          return 'Face ID';
        case 'Biometrics':
          return 'Fingerprint';
        default:
          return 'Biometric';
      }
    } catch (error) {
      return 'Biometric';
    }
  }
}

export default BiometricAuthService;
