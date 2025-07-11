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
  StatusBar,
  SafeAreaView,
  TextInput,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../Theme/ThemeProvider';
import {createStyles} from './styles';

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
  const passwordInputRef = useRef(null);

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
    setAttempts(0);
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
    ]).start(() => {
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 300);
    });
  };

  const hideModal = () => {
    Keyboard.dismiss();
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

  const handlePasswordChange = text => {
    const numericText = text.replace(/[^0-9]/g, '');

    if (mode === 'set' && isConfirmMode) {
      if (numericText.length <= maxLength) {
        setConfirmPassword(numericText);

        if (numericText.length === maxLength) {
          setTimeout(() => {
            handlePasswordSubmit(numericText, true);
          }, 100);
        }
      }
    } else {
      if (numericText.length <= maxLength) {
        setPassword(numericText);

        if (numericText.length === maxLength) {
          setTimeout(() => {
            handlePasswordSubmit(numericText, false);
          }, 100);
        }
      }
    }
  };

  const handlePasswordSubmit = (inputPassword = null, isConfirming = false) => {
    const currentPassword =
      inputPassword || (isConfirming ? confirmPassword : password);

    if (currentPassword.length !== maxLength) {
      return;
    }

    if (mode === 'set' && (isConfirming || isConfirmMode)) {
      if (currentPassword === password) {
        Keyboard.dismiss();
        onSuccess(password);
      } else {
        setConfirmPassword('');
        setPassword('');
        setIsConfirmMode(false);
        setAttempts(prev => prev + 1);
        shakeError();

        setTimeout(() => {
          passwordInputRef.current?.focus();
        }, 500);
      }
    } else if (mode === 'verify') {
      const result = onSuccess(currentPassword);
      if (result === false) {
        setTimeout(() => {
          setPassword('');
          setAttempts(prev => prev + 1);
          shakeError();

          setTimeout(() => {
            passwordInputRef.current?.focus();
          }, 500);
        }, 100);
      } else {
        Keyboard.dismiss();
      }
    } else if (mode === 'set' && !isConfirmMode) {
      setIsConfirmMode(true);

      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    }
  };

  const handleBackspace = () => {
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

          {/* Input Row: TextInput + Backspace */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Visible TextInput for keyboard interaction */}
            <TextInput
              ref={passwordInputRef}
              style={styles.visibleInput}
              value={getCurrentPassword()}
              onChangeText={handlePasswordChange}
              onSubmitEditing={() => handlePasswordSubmit()}
              keyboardType="numeric"
              secureTextEntry={true}
              maxLength={maxLength}
              autoFocus={false}
              caretHidden={true}
              contextMenuHidden={true}
              placeholder="Tap to enter password"
              placeholderTextColor={isDark ? '#666666' : '#999999'}
            />
            {/* Backspace Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.backspaceButton,
                {marginLeft: 25},
              ]}
              onPress={handleBackspace}
              activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="backspace-outline"
                size={20}
                color={isDark ? '#ffffff' : '#666666'}
              />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            {/* Biometric Button */}
            {showBiometric && (
              <TouchableOpacity
                style={[styles.actionButton, styles.biometricButton]}
                onPress={onBiometric}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="fingerprint"
                  size={20}
                  color="#ff1744"
                />
              </TouchableOpacity>
            )}
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
