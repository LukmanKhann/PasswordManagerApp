import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../Theme/ThemeProvider';
import { FIREBASE_AUTH } from '../Firebase/FirebaseConfig';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoIcon: {
      marginBottom: 20,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      borderRadius: 12,
      backgroundColor: isDark ? '#111111' : '#f8f8f8',
      paddingHorizontal: 15,
      height: 55,
    },
    inputWrapperFocused: {
      borderColor: isDark ? '#ffffff' : '#000000',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },
    inputIcon: {
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
    },
    eyeIcon: {
      padding: 5,
    },
    passwordStrength: {
      marginTop: 8,
      marginLeft: 4,
    },
    passwordStrengthText: {
      fontSize: 12,
      color: isDark ? '#cccccc' : '#666666',
    },
    signupButton: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      borderRadius: 12,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: isDark ? '#ffffff' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    signupButtonText: {
      color: isDark ? '#000000' : '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
    termsContainer: {
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    termsText: {
      fontSize: 12,
      color: isDark ? '#999999' : '#666666',
      textAlign: 'center',
      lineHeight: 18,
    },
    termsLink: {
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '600',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#333333' : '#e0e0e0',
    },
    dividerText: {
      marginHorizontal: 16,
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 14,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 16,
    },
    loginLink: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 5,
    },
  });

  const getPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={isDark ? '#ffffff' : '#000000'}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="account-plus-outline"
            size={80}
            color={isDark ? '#ffffff' : '#000000'}
            style={styles.logoIcon}
          />
          <Text style={styles.logoText}>Create Account</Text>
          <Text style={styles.subtitle}>Join SecureVault today</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={isDark ? '#cccccc' : '#666666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Full name"
                placeholderTextColor={isDark ? '#666666' : '#999999'}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={isDark ? '#cccccc' : '#666666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email address"
                placeholderTextColor={isDark ? '#666666' : '#999999'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={isDark ? '#cccccc' : '#666666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={isDark ? '#666666' : '#999999'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password-new"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={isDark ? '#cccccc' : '#666666'}
                />
              </TouchableOpacity>
            </View>
            {password.length > 0 && (
              <View style={styles.passwordStrength}>
                <Text style={styles.passwordStrengthText}>
                  Password strength: {getPasswordStrength(password)}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-check"
                size={24}
                color={isDark ? '#cccccc' : '#666666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm password"
                placeholderTextColor={isDark ? '#666666' : '#999999'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password-new"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={isDark ? '#cccccc' : '#666666'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
            disabled={loading}>
            <Text style={styles.signupButtonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;