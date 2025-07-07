import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../Theme/ThemeProvider';
import {createStyles} from './styles';

const {width, height} = Dimensions.get('window');

const NumericPasswordModal = ({
  visible,
  onClose,
  onSuccess,
  onForgot,
  title = 'Enter Password',
  subtitle = 'Enter your 4-digit password',
  mode = 'verify',
  maxLength = 4,
  showBiometric = false,
  onBiometric,
}) => {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const styles = createStyles(isDark);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      resetForm();
      showModal();
    } else {
      hideModal();
    }
  }, [visible]);

  const resetForm = () => {
    setPassword('');
    setConfirmPassword('');
    setIsConfirmMode(false);
  };

  const showModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 150,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideModal = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.95);
    shakeAnimation.setValue(0);
  };

  const shakeError = useCallback(() => {
    const sequence = [10, -10, 8, -8, 0];
    const animations = sequence.map((value, index) =>
      Animated.timing(shakeAnimation, {
        toValue: value,
        duration: 60,
        useNativeDriver: true,
      }),
    );

    Animated.sequence(animations).start();
  }, [shakeAnimation]);

  const handleNumberPress = useCallback(
    number => {
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
              setAttempts(prev => prev + 1);
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
              const result = onSuccess(newPassword);
              if (result === false) {
                setTimeout(() => {
                  setPassword('');
                  setAttempts(prev => prev + 1);
                  shakeError();
                }, 100);
              }
            } else if (mode === 'set') {
              setIsConfirmMode(true);
            }
          }
        }
      }
    },
    [
      mode,
      isConfirmMode,
      confirmPassword,
      password,
      maxLength,
      onSuccess,
      shakeError,
    ],
  );

  const handleBackspace = useCallback(() => {
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
  }, [mode, isConfirmMode, confirmPassword, password]);

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

  // Optimized NumberButton component
  const NumberButton = React.memo(({number, onPress}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        style={styles.numberButtonContainer}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}>
        <Animated.View
          style={[
            styles.numberButton,
            isDark ? styles.numberButtonDark : styles.numberButtonLight,
            {transform: [{scale: scaleValue}]},
          ]}>
          <Text
            style={[
              styles.numberText,
              isDark ? styles.numberTextDark : styles.numberTextLight,
            ]}>
            {number}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.95)"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            isDark ? styles.containerDark : styles.containerLight,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}, {translateX: shakeAnimation}],
            },
          ]}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={isDark ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.headerIcon,
                isDark ? styles.headerIconDark : styles.headerIconLight,
              ]}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={32}
                color="#ff1744"
              />
            </View>
            <Text
              style={[
                styles.title,
                isDark ? styles.titleDark : styles.titleLight,
              ]}>
              {getCurrentTitle()}
            </Text>
            <Text
              style={[
                styles.subtitle,
                isDark ? styles.subtitleDark : styles.subtitleLight,
              ]}>
              {getCurrentSubtitle()}
            </Text>
          </View>

          {/* Password Dots */}
          <View style={styles.passwordContainer}>
            {Array.from({length: maxLength}).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.passwordDot,
                  isDark ? styles.passwordDotDark : styles.passwordDotLight,
                  index < getCurrentPassword().length &&
                    styles.passwordDotFilled,
                ]}
              />
            ))}
          </View>

          {/* Keypad */}
          <View style={styles.keypad}>
            {[
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ].map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keypadRow}>
                {row.map(number => (
                  <NumberButton
                    key={number}
                    number={number}
                    onPress={() => handleNumberPress(number.toString())}
                  />
                ))}
              </View>
            ))}

            <View style={styles.keypadRow}>
              {/* Biometric Button */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  showBiometric && styles.biometricButton,
                ]}
                onPress={showBiometric ? onBiometric : undefined}
                activeOpacity={showBiometric ? 0.7 : 1}>
                {showBiometric && (
                  <MaterialCommunityIcons
                    name="fingerprint"
                    size={24}
                    color="#ff1744"
                  />
                )}
              </TouchableOpacity>

              <NumberButton number={0} onPress={() => handleNumberPress('0')} />

              {/* Backspace Button */}
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

          {/* Footer */}
          <View style={styles.footer}>
            {mode === 'verify' && onForgot && (
              <TouchableOpacity style={styles.forgotButton} onPress={onForgot}>
                <Text
                  style={[
                    styles.forgotText,
                    isDark ? styles.forgotTextDark : styles.forgotTextLight,
                  ]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}

            {attempts > 0 && (
              <Text
                style={[
                  styles.attemptsText,
                  isDark ? styles.attemptsTextDark : styles.attemptsTextLight,
                ]}>
                Attempts: {attempts}
              </Text>
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default NumericPasswordModal;
