import React, {useContext, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
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
import PasswordForm from './components/PasswordForm';
import {
  generatePassword,
  calculatePasswordStrength,
  getStrengthColor,
} from './utils/passwordUtils';

const PasswordGenerator = () => {
  const {theme} = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [sliderValue, setSliderValue] = useState(8);
  const [useSlider, setUseSlider] = useState(true);

  // ScrollView ref for auto-scroll
  const scrollViewRef = useRef(null);

  // Ref for password card to scroll to
  const passwordCardRef = useRef(null);

  const handlePasswordGeneration = passwordLength => {
    try {
      const passwordResult = generatePassword(passwordLength, {
        lowerCase,
        upperCase,
        numbers,
        symbols,
      });

      setPassword(passwordResult);
      setIsPasswordGenerated(true);
      setPasswordStrength(calculatePasswordStrength(passwordResult));

      // Animate password appearance
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        if (passwordCardRef.current && scrollViewRef.current) {
          passwordCardRef.current.measureLayout(
            scrollViewRef.current,
            (x, y) => {
              scrollViewRef.current.scrollTo({
                x: 0,
                y: y - 50,
                animated: true,
              });
            },
            error => {
              console.log('Error measuring layout:', error);
            },
          );
        }
      }, 100);
    } catch (error) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#ff4444',
        textColor: '#ffffff',
      });
    }
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
    setSliderValue(8);
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
          ref={scrollViewRef}
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
            <PasswordForm
              styles={styles}
              isDark={isDark}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              useSlider={useSlider}
              setUseSlider={setUseSlider}
              lowerCase={lowerCase}
              setLowerCase={setLowerCase}
              upperCase={upperCase}
              setUpperCase={setUpperCase}
              numbers={numbers}
              setNumbers={setNumbers}
              symbols={symbols}
              setSymbols={setSymbols}
              onSubmit={handlePasswordGeneration}
              onReset={resetAllSettings}
            />

            {/* Generated Password Display */}
            {isPasswordGenerated && (
              <Animated.View
                ref={passwordCardRef}
                style={[styles.passwordCard, {opacity: fadeAnim}]}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.passwordTitle}>Generated Password</Text>
                  <View
                    style={[
                      styles.strengthBadge,
                      {
                        backgroundColor: getStrengthColor(
                          passwordStrength,
                          isDark,
                        ),
                      },
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
