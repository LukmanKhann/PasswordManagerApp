import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, {useContext, useState} from 'react';
import {Formik} from 'formik';
import {
  SafeAreaView,
  ScrollView,
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
import {getStyles} from './styles';

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
                  {/* Character Options */}
                  <View style={styles.optionsSection}>
                    <Text style={styles.sectionTitle}>Character Types</Text>

                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => setLowerCase(!lowerCase)}
                      activeOpacity={0.7}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="text-fields"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>Lowercase Letters</Text>
                      </View>
                      <View style={styles.checkboxContainer}>
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
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => setUpperCase(!upperCase)}
                      activeOpacity={0.7}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="format-size"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>Uppercase Letters</Text>
                      </View>
                      <View style={styles.checkboxContainer}>
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
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => setNumbers(!numbers)}
                      activeOpacity={0.7}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="tag"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>Numbers</Text>
                      </View>
                      <View style={styles.checkboxContainer}>
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
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => setSymbols(!symbols)}
                      activeOpacity={0.7}>
                      <View style={styles.optionLabel}>
                        <Icon
                          name="code"
                          size={20}
                          color={isDark ? '#ffffff' : '#000000'}
                        />
                        <Text style={styles.optionText}>
                          Special Characters
                        </Text>
                      </View>
                      <View style={styles.checkboxContainer}>
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
                        />
                      </View>
                    </TouchableOpacity>
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

export default PasswordGenerator;
