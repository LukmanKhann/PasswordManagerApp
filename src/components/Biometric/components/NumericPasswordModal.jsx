import React, {useState, useEffect, useContext} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../Theme/ThemeProvider';

const NumericPasswordModal = ({
  visible,
  onClose,
  onSuccess,
  onForgot,
  title = 'Enter Password',
  subtitle = 'Enter your 4-digit password',
  mode = 'verify',
  maxLength = 4,
}) => {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const shakeAnimation = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsConfirmMode(false);
    }
  }, [visible]);

  const shakeError = () => {
    Vibration.vibrate(100);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNumberPress = number => {
    setError('');

    if (mode === 'set' && isConfirmMode) {
      if (confirmPassword.length < maxLength) {
        const newConfirmPassword = confirmPassword + number;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword.length === maxLength) {
          if (newConfirmPassword === password) {
            onSuccess(password);
          } else {
            setError('Passwords do not match');
            setConfirmPassword('');
            setPassword('');
            setIsConfirmMode(false);
            shakeError();
          }
        }
      }
    } else {
      if (password.length < maxLength) {
        const newPassword = password + number;
        setPassword(newPassword);

        if (newPassword.length === maxLength) {
          if (mode === 'verify') {
            onSuccess(newPassword);
          } else if (mode === 'set') {
            setIsConfirmMode(true);
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    setError('');

    if (mode === 'set' && isConfirmMode) {
      if (confirmPassword.length > 0) {
        setConfirmPassword(confirmPassword.slice(0, -1));
      } else {
        setIsConfirmMode(false);
      }
    } else {
      if (password.length > 0) {
        setPassword(password.slice(0, -1));
      }
    }
  };

  const getCurrentPassword = () => {
    return mode === 'set' && isConfirmMode ? confirmPassword : password;
  };

  const getCurrentTitle = () => {
    if (mode === 'set' && isConfirmMode) {
      return 'Confirm Password';
    }
    return title;
  };

  const getCurrentSubtitle = () => {
    if (mode === 'set' && isConfirmMode) {
      return 'Re-enter your password to confirm';
    }
    return subtitle;
  };

  const styles = {
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      borderRadius: 20,
      padding: 30,
      width: '85%',
      maxWidth: 400,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
    },
    passwordContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 30,
    },
    passwordDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: isDark ? '#666666' : '#cccccc',
      marginHorizontal: 8,
    },
    passwordDotFilled: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      borderColor: isDark ? '#ffffff' : '#000000',
    },
    keypad: {
      alignItems: 'center',
    },
    keypadRow: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    numberButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: isDark ? '#333333' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    numberButtonPressed: {
      backgroundColor: isDark ? '#555555' : '#e0e0e0',
    },
    numberText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
    },
    actionButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    backspaceButton: {
      backgroundColor: isDark ? '#444444' : '#e8e8e8',
    },
    errorContainer: {
      minHeight: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    errorText: {
      color: '#ff4444',
      fontSize: 14,
      textAlign: 'center',
    },
    forgotButton: {
      marginTop: 20,
      alignSelf: 'center',
    },
    forgotText: {
      color: isDark ? '#4da6ff' : '#0066cc',
      fontSize: 16,
    },
  };

  const NumberButton = ({number, onPress}) => {
    const [pressed, setPressed] = useState(false);

    return (
      <TouchableOpacity
        style={[styles.numberButton, pressed && styles.numberButtonPressed]}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        activeOpacity={0.7}>
        <Text style={styles.numberText}>{number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {transform: [{translateX: shakeAnimation}]},
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>{getCurrentTitle()}</Text>
            <Text style={styles.subtitle}>{getCurrentSubtitle()}</Text>
          </View>

          <View style={styles.passwordContainer}>
            {Array.from({length: maxLength}).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.passwordDot,
                  index < getCurrentPassword().length &&
                    styles.passwordDotFilled,
                ]}
              />
            ))}
          </View>

          <View style={styles.keypad}>
            <View style={styles.keypadRow}>
              <NumberButton number={1} onPress={() => handleNumberPress('1')} />
              <NumberButton number={2} onPress={() => handleNumberPress('2')} />
              <NumberButton number={3} onPress={() => handleNumberPress('3')} />
            </View>
            <View style={styles.keypadRow}>
              <NumberButton number={4} onPress={() => handleNumberPress('4')} />
              <NumberButton number={5} onPress={() => handleNumberPress('5')} />
              <NumberButton number={6} onPress={() => handleNumberPress('6')} />
            </View>
            <View style={styles.keypadRow}>
              <NumberButton number={7} onPress={() => handleNumberPress('7')} />
              <NumberButton number={8} onPress={() => handleNumberPress('8')} />
              <NumberButton number={9} onPress={() => handleNumberPress('9')} />
            </View>
            <View style={styles.keypadRow}>
              <View style={styles.actionButton} />
              <NumberButton number={0} onPress={() => handleNumberPress('0')} />
              <TouchableOpacity
                style={[styles.actionButton, styles.backspaceButton]}
                onPress={handleBackspace}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="backspace-outline"
                  size={24}
                  color={isDark ? '#ffffff' : '#000000'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.errorContainer}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {mode === 'verify' && onForgot && (
            <TouchableOpacity style={styles.forgotButton} onPress={onForgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default NumericPasswordModal;
