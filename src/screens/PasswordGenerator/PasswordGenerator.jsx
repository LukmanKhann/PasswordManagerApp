import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, {useContext, useState} from 'react';
import {Formik} from 'formik';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import {ThemeContext} from '../../Theme/ThemeProvider';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Minimum 4 characters required')
    .max(32, 'Maximum 32 characters allowed')
    .required('Password length is required'),
});

const PasswordGenerator = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const generatePassword = passwordLength => {
    let characterList = '';

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const digitsChars = '0123456789';

    if (upperCase) characterList += uppercaseChars;
    if (lowerCase) characterList += lowercaseChars;
    if (numbers) characterList += digitsChars;
    if (symbols) characterList += specialChars;

    if (characterList === '') {
      Snackbar.show({
        text: 'Please select at least one character type',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#ff4444',
        textColor: '#ffffff',
      });
      return;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
    calculatePasswordStrength(passwordResult);

    // Animate password appearance
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const calculatePasswordStrength = password => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) setPasswordStrength('Weak');
    else if (score < 5) setPasswordStrength('Medium');
    else setPasswordStrength('Strong');
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setPasswordStrength('');
    fadeAnim.setValue(0);
  };

  const resetAllSettings = () => {
    resetPassword();
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const copyPassword = async itemPassword => {
    await Clipboard.setString(itemPassword);
    Snackbar.show({
      text: 'Password copied to clipboard',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: theme === 'dark' ? '#333333' : '#666666',
      textColor: '#ffffff',
      action: {
        text: 'OK',
        textColor: '#ffffff',
        onPress: Snackbar.dismiss,
      },
    });
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Weak':
        return '#ff4444';
      case 'Medium':
        return '#ffaa00';
      case 'Strong':
        return '#00aa44';
      default:
        return theme === 'dark' ? '#666666' : '#cccccc';
    }
  };

  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Password Generator</Text>
              <Text style={styles.subtitle}>
                Create secure passwords instantly
              </Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={passwordSchema}
              onSubmit={values => {
                generatePassword(Number(values.passwordLength));
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
                setFieldTouched,
              }) => (
                <>
                  {/* Password Length Input */}
                  <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Password Length</Text>
                    <View style={styles.inputContainer}>
                      <Icon
                        name="straighten"
                        size={20}
                        color={isDark ? '#666666' : '#999999'}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.textInput}
                        value={values.passwordLength}
                        onChangeText={handleChange('passwordLength')}
                        placeholder="Enter length (4-32)"
                        placeholderTextColor={isDark ? '#666666' : '#999999'}
                        keyboardType="numeric"
                        onBlur={() => setFieldTouched('passwordLength')}
                        maxLength={2}
                      />
                    </View>
                    {touched.passwordLength && errors.passwordLength && (
                      <View style={styles.errorContainer}>
                        <Icon name="error-outline" size={16} color="#ff4444" />
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Character Options */}
                  <View style={styles.optionsSection}>
                    <Text style={styles.sectionTitle}>Character Types</Text>

                    <View style={styles.optionItem}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="text-fields"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>Lowercase Letters</Text>
                      </View>
                      <BouncyCheckbox
                        size={20}
                        fillColor={isDark ? '#ffffff' : '#000000'}
                        unfillColor="transparent"
                        iconStyle={{
                          borderColor: isDark ? '#ffffff' : '#000000',
                        }}
                        disableBuiltInState
                        isChecked={lowerCase}
                        onPress={() => setLowerCase(!lowerCase)}
                      />
                    </View>

                    <View style={styles.optionItem}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="format-size"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>Uppercase Letters</Text>
                      </View>
                      <BouncyCheckbox
                        size={20}
                        fillColor={isDark ? '#ffffff' : '#000000'}
                        unfillColor="transparent"
                        iconStyle={{
                          borderColor: isDark ? '#ffffff' : '#000000',
                        }}
                        disableBuiltInState
                        isChecked={upperCase}
                        onPress={() => setUpperCase(!upperCase)}
                      />
                    </View>

                    <View style={styles.optionItem}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="tag"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>Numbers</Text>
                      </View>
                      <BouncyCheckbox
                        size={20}
                        fillColor={isDark ? '#ffffff' : '#000000'}
                        unfillColor="transparent"
                        iconStyle={{
                          borderColor: isDark ? '#ffffff' : '#000000',
                        }}
                        disableBuiltInState
                        isChecked={numbers}
                        onPress={() => setNumbers(!numbers)}
                      />
                    </View>

                    <View style={styles.optionItem}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="special-character"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>
                          Special Characters
                        </Text>
                      </View>
                      <BouncyCheckbox
                        size={20}
                        fillColor={isDark ? '#ffffff' : '#000000'}
                        unfillColor="transparent"
                        iconStyle={{
                          borderColor: isDark ? '#ffffff' : '#000000',
                        }}
                        disableBuiltInState
                        isChecked={symbols}
                        onPress={() => setSymbols(!symbols)}
                        style={styles.bouncyCheckBox}
                      />
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[
                        styles.primaryButton,
                        !isValid && styles.disabledButton,
                      ]}
                      onPress={handleSubmit}
                      disabled={!isValid}
                      activeOpacity={0.8}>
                      <Icon
                        name="vpn-key"
                        size={20}
                        color={
                          !isValid ? '#666666' : isDark ? '#000000' : '#ffffff'
                        }
                      />
                      <Text
                        style={[
                          styles.primaryButtonText,
                          !isValid && styles.disabledButtonText,
                        ]}>
                        Generate Password
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={() => {
                        handleReset();
                        resetAllSettings();
                      }}
                      activeOpacity={0.8}>
                      <Icon
                        name="refresh"
                        size={20}
                        color={isDark ? '#ffffff' : '#000000'}
                      />
                      <Text style={styles.secondaryButtonText}>Reset All</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>

            {/* Generated Password Display */}
            {isPasswordGenerated && (
              <Animated.View style={[styles.passwordCard, {opacity: fadeAnim}]}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.passwordTitle}>Generated Password</Text>
                  <View
                    style={[
                      styles.strengthBadge,
                      {backgroundColor: getStrengthColor()},
                    ]}>
                    <Text style={styles.strengthText}>{passwordStrength}</Text>
                  </View>
                </View>

                <View style={styles.passwordContainer}>
                  <Text style={styles.passwordText} selectable>
                    {password}
                  </Text>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => copyPassword(password)}
                    activeOpacity={0.7}>
                    <Icon
                      name="content-copy"
                      size={20}
                      color={isDark ? '#ffffff' : '#000000'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.passwordInfo}>
                  <View style={styles.infoItem}>
                    <Icon
                      name="info-outline"
                      size={16}
                      color={isDark ? '#888888' : '#666666'}
                    />
                    <Text style={styles.infoText}>
                      Length: {password.length} characters
                    </Text>
                  </View>
                </View>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const getStyles = isDark =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#000000',
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#888888' : '#666666',
      marginTop: 4,
    },
    themeToggle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    formContainer: {
      paddingHorizontal: 24,
    },
    inputSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      borderRadius: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      paddingHorizontal: 16,
      height: 56,
    },
    bouncyCheckBox: {
      marginBottom: 8,
    },
    inputIcon: {
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '500',
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    errorText: {
      fontSize: 14,
      color: '#ff4444',
      marginLeft: 6,
      fontWeight: '500',
    },
    optionsSection: {
      marginBottom: 32,
    },
    optionItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderRadius: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    optionLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      // flex: 1,
    },
    optionText: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      marginLeft: 12,
      fontWeight: '500',
    },
    actionButtons: {
      gap: 16,
      marginBottom: 32,
    },
    primaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#ffffff' : '#000000',
      paddingVertical: 16,
      borderRadius: 12,
      gap: 8,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#000000' : '#ffffff',
      letterSpacing: -0.2,
    },
    disabledButton: {
      backgroundColor: isDark ? '#333333' : '#e0e0e0',
    },
    disabledButtonText: {
      color: '#666666',
    },
    secondaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isDark ? '#ffffff' : '#000000',
      gap: 8,
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
      letterSpacing: -0.2,
    },
    passwordCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
    },
    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    passwordTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#000000',
    },
    strengthBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    strengthText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#ffffff',
      textTransform: 'uppercase',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#000000' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      marginBottom: 16,
    },
    passwordText: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'monospace',
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    copyButton: {
      marginLeft: 12,
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDark ? '#333333' : '#f0f0f0',
    },
    passwordInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 14,
      color: isDark ? '#888888' : '#666666',
      marginLeft: 6,
      fontWeight: '500',
    },
  });

export default PasswordGenerator;
