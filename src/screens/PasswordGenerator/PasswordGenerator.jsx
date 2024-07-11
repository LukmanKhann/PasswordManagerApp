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
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {IconButton} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {ThemeContext} from '../../Theme/ThemeProvider';

const passwordShema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

const PasswordGenerator = () => {
  const {theme} = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = passwordLength => {
    let characterList = '';

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*()_-+=<>?/[]{}|';
    const digitsChars = '0123456789';

    if (upperCase) {
      characterList += uppercaseChars;
    }
    if (lowerCase) {
      characterList += lowercaseChars;
    }
    if (numbers) {
      characterList += digitsChars;
    }
    if (symbols) {
      characterList += specialChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const copyPassword = itemPassword => {
    Clipboard.setString(itemPassword);
    Snackbar.show({
      text: 'Password copied to clipboard',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: theme === 'dark' ? '#ffffff' : '#121212',
      action: {
        text: 'Close',
        textColor: '#b2b2b2',
        onPress: Snackbar.dismiss,
      },
    });
  };

  const styles = getStyles(theme);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordShema}
            initialTouched={{passwordLength: true}}
            onSubmit={values => {
              console.log('values', values);
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
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Password Length:</Text>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                    onBlur={() => setFieldTouched('passwordLength')}
                  />
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.label}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor={theme === 'dark' ? '#ffffff' : '#1f1f1f'}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.label}>Include Uppercase Letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor={theme === 'dark' ? '#ffffff' : '#1f1f1f'}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.label}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor={theme === 'dark' ? '#ffffff' : '#1f1f1f'}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.label}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor={theme === 'dark' ? '#ffffff' : '#1f1f1f'}
                  />
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          {isPasswordGenerated && (
            <View style={[styles.card, styles.elevatedCard]}>
              <Text style={styles.subTitle}>Success!</Text>
              <Text selectable style={styles.generatePassword}>
                Password:{' '}
                <Text style={styles.generatedPassword}>{password}</Text>
              </Text>
              <TouchableOpacity onPress={() => copyPassword(password)}>
                <IconButton icon="content-copy" size={22} color="#6200ea" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PasswordGenerator;

const getStyles = theme =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
      padding: 20,
    },
    formContainer: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
      borderRadius: 10,
      padding: 20,
      shadowColor: theme === 'dark' ? '#ffffff' : '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    inputWrapper: {
      marginBottom: 15,
    },
    heading: {
      fontSize: 15,
      fontWeight: '600',
      color: theme === 'dark' ? '#ffffff' : '#333',
      marginBottom: 5,
    },
    errorText: {
      fontSize: 12,
      color: '#ff0000',
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#ffffff' : '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f9f9f9',
      color: theme === 'dark' ? '#ffffff' : '#000',
    },
    checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    label: {
      fontSize: 14,
      color: theme === 'dark' ? '#ffffff' : '#6f6f6f',
      letterSpacing: 0.4,
    },
    formAction: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    primaryBtn: {
      backgroundColor: theme === 'dark' ? '#ffffff' : '#313131',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryBtnTxt: {
      color: theme === 'dark' ? '#000000' : '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryBtn: {
      backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fafafa',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: theme === 'dark' ? '#ffffff' : '#454545',
    },
    secondaryBtnTxt: {
      color: theme === 'dark' ? '#ffffff' : '#454545',
      fontSize: 16,
      fontWeight: '600',
    },
    card: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
      borderRadius: 10,
      padding: 20,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    elevatedCard: {
      shadowColor: theme === 'dark' ? '#ffffff' : '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    subTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme === 'dark' ? '#ffffff' : '#9a9a9a',
      marginBottom: 10,
    },
    generatePassword: {
      fontSize: 16,
      fontWeight: '600',
      color: theme === 'dark' ? '#ffffff' : '#333',
    },
    generatedPassword: {
      fontSize: 14,
      fontWeight: '600',
      color: theme === 'dark' ? '#9a9a9a' : '#6f6f6f',
    },
  });
